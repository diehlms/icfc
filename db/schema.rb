# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_07_211251) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
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

  create_table "comments", force: :cascade do |t|
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.integer "article_id"
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

  create_table "galleries", force: :cascade do |t|
    t.string "image"
    t.string "caption"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
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
    t.index ["email_id"], name: "index_users_on_email_id"
  end

  add_foreign_key "articles", "users"
  add_foreign_key "cabin_attachments", "cabins"
  add_foreign_key "cabindates", "cabins"
  add_foreign_key "cabins", "users"
  add_foreign_key "comments", "articles"
  add_foreign_key "comments", "users"
  add_foreign_key "events", "users"
end
