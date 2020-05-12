class Article < ApplicationRecord
    extend FriendlyId
    self.per_page = 10
    
    has_many :comments, dependent: :destroy
    belongs_to :user

    mount_uploader :image, ImageUploader

    include Filterable
    
    accepts_nested_attributes_for :comments
    
    validates :title, presence: true, length: { maximum: 50 }
    validates :content, presence: true, length: { maximum: 50000 }
    validates :user_id, presence: true

    friendly_id :title, use: :slugged
end
