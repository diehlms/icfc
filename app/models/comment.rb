class Comment < ApplicationRecord
    belongs_to :user, optional: true
    belongs_to :article

    self.per_page = 20

    validates :content, presence: true, allow_blank: false, length: { maximum: 1000}
end
