class Comment < ApplicationRecord
    belongs_to :user, optional: true
    belongs_to :article

    validates :content, presence: true, allow_blank: false, length: { maximum: 1000}
end
