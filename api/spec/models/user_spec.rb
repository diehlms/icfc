# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  admin                  :boolean          default(FALSE)
#  confirm_token          :string
#  email                  :string
#  email_confirmed        :boolean          default(FALSE)
#  firstname              :string
#  lastname               :string
#  password_digest        :string
#  password_reset_sent_at :datetime
#  password_reset_token   :string
#  phone_number           :string
#  remember_digest        :string
#  slug                   :string
#  username               :string
#  verified               :boolean          default(FALSE)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  email_id               :bigint
#
# Indexes
#
#  index_users_on_email_id  (email_id)
#  index_users_on_slug      (slug) UNIQUE
#
require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    subject { build(:user) }

    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password).on(:create) }
    it { should validate_length_of(:email).is_at_most(105) }
    it { should validate_length_of(:username).is_at_least(6).is_at_most(20) }
    it { should validate_uniqueness_of(:email).case_insensitive }

    describe 'email format' do
      it 'is valid with a proper email format' do
        user = build(:user, email: 'test@example.com')
        expect(user).to be_valid
      end

      it 'is invalid with an improper email format' do
        user = build(:user, email: 'invalid-email')
        expect(user).not_to be_valid
        expect(user.errors[:email]).to include('is invalid')
      end
    end

    describe 'password format' do
      it 'is valid with a strong password' do
        user = build(:user, password: 'StrongPass123')
        expect(user).to be_valid
      end

      it 'is invalid with a weak password' do
        user = build(:user, password: 'weak')
        expect(user).not_to be_valid
        expect(user.errors[:password]).to include('is invalid')
      end
    end
  end

  describe 'associations' do
    it { should have_many(:articles).dependent(:destroy) }
    it { should have_many(:events).dependent(:destroy) }
    it { should have_many(:cabins).dependent(:destroy) }
    it { should have_many(:galleries).dependent(:destroy) }
    it { should have_many(:charts).dependent(:destroy) }
    it { should have_many(:rideshares).dependent(:destroy) }
    it { should have_many(:family_trees).dependent(:destroy) }
    it { should have_many(:family_members).dependent(:destroy) }
    it { should have_many(:comments).dependent(:destroy) }
  end

  describe 'callbacks' do
    it 'downcases email before saving' do
      user = create(:user, email: 'TEST@EXAMPLE.COM')
      expect(user.email).to eq('test@example.com')
    end

    it 'generates confirmation token before create' do
      user = build(:user)
      expect(user.confirm_token).to be_nil
      user.save!
      expect(user.confirm_token).not_to be_nil
    end
  end

  describe 'instance methods' do
    let(:user) { create(:user) }

    describe '#email_activate' do
      it 'activates the user email' do
        expect(user.email_confirmed).to be_falsey
        user.email_activate
        expect(user.email_confirmed).to be_truthy
        expect(user.confirm_token).to be_nil
      end
    end

    describe '#send_password_reset' do
      it 'sends a password reset email' do
        expect(UserMailer).to receive(:password_reset).with(user).and_return(double(deliver: true))
        user.send_password_reset
      end
    end

    describe '#remember' do
      it 'creates remember token and digest' do
        user.remember
        expect(user.remember_token).not_to be_nil
        expect(user.remember_digest).not_to be_nil
      end
    end

    describe '#authenticated?' do
      it 'returns true for valid remember token' do
        user.remember
        expect(user.authenticated?(user.remember_token)).to be_truthy
      end

      it 'returns false for invalid remember token' do
        expect(user.authenticated?('invalid_token')).to be_falsey
      end

      it 'returns false when remember_digest is nil' do
        user.update_attribute(:remember_digest, nil)
        expect(user.authenticated?('any_token')).to be_falsey
      end
    end

    describe '#forget' do
      it 'clears remember digest' do
        user.remember
        expect(user.remember_digest).not_to be_nil
        user.forget
        expect(user.remember_digest).to be_nil
      end
    end
  end

  describe 'class methods' do
    describe '.digest' do
      it 'creates a BCrypt digest' do
        digest = User.digest('password')
        expect(digest).to be_a(String)
        expect(BCrypt::Password.new(digest).is_password?('password')).to be_truthy
      end
    end

    describe '.new_token' do
      it 'generates a secure random token' do
        token1 = User.new_token
        token2 = User.new_token
        expect(token1).to be_a(String)
        expect(token1).not_to eq(token2)
      end
    end
  end

  describe 'friendly_id' do
    it 'uses username for slug' do
      user = create(:user, username: 'test-user')
      expect(user.slug).to eq('test-user')
    end
  end
end
