# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_11_11_204133) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.string "image"
    t.boolean "pinned", default: false
    t.string "slug"
    t.index ["slug"], name: "index_articles_on_slug", unique: true
  end

  create_table "cabin_attachments", force: :cascade do |t|
    t.integer "cabin_id"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cabindates", force: :cascade do |t|
    t.date "startdate"
    t.date "enddate"
    t.integer "cabin_id"
  end

  create_table "cabins", force: :cascade do |t|
    t.string "name"
    t.string "bedrooms"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.boolean "washerdryer", default: false
    t.boolean "dock", default: false
    t.string "description"
    t.integer "price_per_week"
    t.integer "price_per_day"
  end

  create_table "camp_messages", force: :cascade do |t|
    t.string "message"
    t.boolean "expired"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "charts", force: :cascade do |t|
    t.string "chart"
    t.string "caption"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.integer "article_id"
  end

  create_table "committees", force: :cascade do |t|
    t.string "url"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "documents", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "document_title"
    t.string "document_folder"
    t.string "document"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "events"
    t.string "location"
    t.date "start_time"
    t.date "end_time"
    t.string "description"
    t.integer "user_id"
  end

  create_table "families", force: :cascade do |t|
    t.string "familyname"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "family_members", force: :cascade do |t|
    t.string "name"
    t.integer "relationship"
    t.date "date_of_birth"
    t.bigint "family_tree_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "parent_ids", default: [], array: true
    t.integer "user_id"
    t.index ["family_tree_id"], name: "index_family_members_on_family_tree_id"
    t.index ["parent_ids"], name: "index_family_members_on_parent_ids", using: :gin
  end

  create_table "family_trees", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "galleries", force: :cascade do |t|
    t.string "image"
    t.string "caption"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "location_points", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "location_name"
    t.string "location_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rideshares", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "departing_at"
    t.datetime "arriving_at"
    t.integer "number_of_passengers"
    t.string "additional_information"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "point_of_arrival_id"
    t.uuid "point_of_departure_id"
    t.string "user_id"
    t.boolean "seeking", default: false
  end

  create_table "room_messages", force: :cascade do |t|
    t.bigint "room_id"
    t.bigint "user_id"
    t.text "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_room_messages_on_room_id"
    t.index ["user_id"], name: "index_room_messages_on_user_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.index ["name"], name: "index_rooms_on_name", unique: true
    t.index ["slug"], name: "index_rooms_on_slug", unique: true
  end

  create_table "sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "email_id"
    t.boolean "admin", default: false
    t.boolean "email_confirmed", default: false
    t.string "confirm_token"
    t.string "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.string "phone_number"
    t.string "firstname"
    t.string "lastname"
    t.string "remember_digest"
    t.boolean "verified", default: false
    t.string "slug"
    t.index ["email_id"], name: "index_users_on_email_id"
    t.index ["slug"], name: "index_users_on_slug", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "articles", "users"
  add_foreign_key "cabin_attachments", "cabins"
  add_foreign_key "cabindates", "cabins"
  add_foreign_key "cabins", "users"
  add_foreign_key "comments", "articles"
  add_foreign_key "comments", "users"
  add_foreign_key "events", "users"
  add_foreign_key "family_members", "family_trees"
  add_foreign_key "galleries", "users"
  add_foreign_key "rideshares", "location_points", column: "point_of_arrival_id"
  add_foreign_key "rideshares", "location_points", column: "point_of_departure_id"
  add_foreign_key "room_messages", "rooms"
  add_foreign_key "room_messages", "users"
end
