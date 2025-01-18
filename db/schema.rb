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

ActiveRecord::Schema[8.0].define(version: 2025_01_14_074439) do
  create_table "application_groups", primary_key: ["application_id", "group_id"], force: :cascade do |t|
    t.integer "application_id", null: false
    t.integer "group_id", null: false
    t.boolean "generated", default: false, null: false
    t.index ["application_id", "group_id"], name: "index_application_groups_on_application_id_and_group_id", unique: true
    t.index ["application_id"], name: "index_application_groups_on_application_id"
    t.index ["group_id", "application_id"], name: "index_application_groups_on_group_id_and_application_id", unique: true
    t.index ["group_id"], name: "index_application_groups_on_group_id"
  end

  create_table "application_users", primary_key: ["application_id", "user_id"], force: :cascade do |t|
    t.integer "application_id", null: false
    t.integer "user_id", null: false
    t.boolean "generated", default: false, null: false
    t.index ["application_id", "user_id"], name: "index_application_users_on_application_id_and_user_id", unique: true
    t.index ["application_id"], name: "index_application_users_on_application_id"
    t.index ["user_id", "application_id"], name: "index_application_users_on_user_id_and_application_id", unique: true
    t.index ["user_id"], name: "index_application_users_on_user_id"
  end

  create_table "applications", force: :cascade do |t|
    t.string "name", null: false
    t.json "hostnames", default: "[]", null: false
    t.boolean "active", default: true, null: false
    t.string "source", default: "custom", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active"], name: "index_applications_on_active"
    t.index ["name"], name: "index_applications_on_name", unique: true
    t.index ["source"], name: "index_applications_on_source"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_groups_on_name", unique: true
  end

  create_table "user_groups", primary_key: ["user_id", "group_id"], force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "group_id", null: false
    t.index ["group_id", "user_id"], name: "index_user_groups_on_group_id_and_user_id", unique: true
    t.index ["group_id"], name: "index_user_groups_on_group_id"
    t.index ["user_id", "group_id"], name: "index_user_groups_on_user_id_and_group_id", unique: true
    t.index ["user_id"], name: "index_user_groups_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username", null: false
    t.string "password_digest"
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin"], name: "index_users_on_admin"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "application_groups", "applications"
  add_foreign_key "application_groups", "groups"
  add_foreign_key "application_users", "applications"
  add_foreign_key "application_users", "users"
  add_foreign_key "user_groups", "groups"
  add_foreign_key "user_groups", "users"
end
