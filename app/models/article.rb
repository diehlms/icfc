class Article < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :destroy

    validates :title, presence: true, length: { maximum: 50 }
    validates :content, presence: true, length: { maximum: 10000 }
    validates :user_id, presence: true
end
