class User < ApplicationRecord
    has_many :comments
    has_many :articles

    has_strong_password
    
    validates :username, presence: true, length: { maximum: 15 }
    validates :email, #fillin
end
