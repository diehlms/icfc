class User < ActiveRecord::Base
    before_create :confirmation_token
    has_secure_password
    has_many :articles, dependent: :destroy
    has_many :comments, through: :articles
    has_many :events, dependent: :destroy
    has_many :cabins, dependent: :destroy
    has_many :galleries, dependent: :destroy
    has_many :events, dependent: :destroy
    
    before_save { self.email = email.downcase }
  
    self.per_page = 20
    
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    VALID_PHONE_REGEX = /\A(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\z/
    
    validates :email, presence: true, length: { maximum: 105 },
    uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX}
    validates :phone_number, presence: true, format: { with: VALID_PHONE_REGEX }
    validates :username, presence: true, length: { minimum: 6, maximum: 20}
    
    def email_activate
      self.email_confirmed = true
      self.confirm_token = nil
      save!(:validate => false)
    end
  
    def send_password_reset
      generate_token(:password_reset_token)
      self.password_reset_sent_at = Time.zone.now
      save!
      UserMailer.password_reset(self).deliver
    end
  
    def generate_token(column)
      begin
        self[column] = SecureRandom.urlsafe_base64.to_s
      end while User.exists?(column => self[column])
    end
  
    private
  
      def confirmation_token
        if self.confirm_token.blank?
          self.confirm_token = SecureRandom.urlsafe_base64.to_s
        end
      end
  end