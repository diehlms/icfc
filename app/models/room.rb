class Room < ApplicationRecord
    extend FriendlyId

    has_many :room_messages, dependent: :destroy, inverse_of: :room

    friendly_id :name, use: :slugged
end
