class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :username,
             :email,
             :created_at,
             :updated_at,
             :email_id,
             :admin,
             :phone_number,
             :firstname,
             :lastname,
             :verified,
             :slug,
             :recently_joined?

  def recently_joined?
    Date.today.prev_month < object.created_at
  end
end
