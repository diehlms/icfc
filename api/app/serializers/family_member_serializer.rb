class FamilyMemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :updated_at, :user_id, :relationship, :parent_ids, :date_of_birth, :created_at,
             :updated_at
  belongs_to :user, serializer: UserSerializer
end
