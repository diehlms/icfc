class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :article

    self.per_page = 20

    validates :content, presence: true, allow_blank: false, length: { maximum: 1000}
    validates :user_id, presence: true
end
