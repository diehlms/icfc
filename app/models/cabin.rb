class Cabin < ApplicationRecord
    validates :name, presence: true
    validates :bedrooms, presence: true
    has_many :cabindates, dependent: :destroy
    belongs_to :user
    has_many :cabin_attachments, dependent: :destroy
    accepts_nested_attributes_for :cabin_attachments
end
