# typed: strict
# frozen_string_literal: true

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

class User < ActiveRecord::Base
  extend T::Sig
  extend FriendlyId
  attr_accessor :remember_token

  before_create :confirmation_token
  has_secure_password
  has_many :articles, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :events, dependent: :destroy
  has_many :cabins, dependent: :destroy
  has_many :galleries, dependent: :destroy
  has_many :charts, dependent: :destroy
  has_many :rideshares, dependent: :destroy
  has_many :family_trees, dependent: :destroy
  has_many :family_members, dependent: :destroy

  before_save :downcase_email

  self.per_page = 20

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  VALID_PHONE_REGEX = /\A(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\z/
  VALID_PASSWORD_REGEX = /\A(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/x

  validates :email, presence: true, length: { maximum: 105 },
                    uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX }
  validates :username, presence: true, length: { minimum: 6, maximum: 20 }
  validates :password, presence: true, format: { with: VALID_PASSWORD_REGEX }, on: :create
  validates :password, presence: true, format: { with: VALID_PASSWORD_REGEX }, on: :update, allow_nil: true

  friendly_id :username, use: :slugged

  sig { params(string: String).returns(BCrypt::Password) }
  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost:)
  end

  sig { void }
  def email_activate
    self.email_confirmed = true
    self.confirm_token = nil
    save!(validate: false)
  end

  sig { void }
  def send_password_reset
    generate_token(:password_reset_token)
    self.password_reset_sent_at = Time.zone.now
    save!
    UserMailer.password_reset(self).deliver
  end

  sig { returns(String) }
  def self.new_token
    SecureRandom.urlsafe_base64
  end

  sig { void }
  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  sig { params(remember_token: String).returns(T::Boolean) }
  def authenticated?(remember_token)
    return false if remember_digest.nil?

    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  sig { params(column: Symbol).void }
  def generate_token(column)
    loop do
      self[column] = SecureRandom.urlsafe_base64.to_s
      break unless User.exists?(column => self[column])
    end
  end

  sig { void }
  def forget
    update_attribute(:remember_digest, nil)
  end

  private

  sig { void }
  def downcase_email
    self.email = T.must(email).downcase
  end

  sig { void }
  def confirmation_token
    return unless confirm_token.blank?

    self.confirm_token = SecureRandom.urlsafe_base64.to_s
  end
end
