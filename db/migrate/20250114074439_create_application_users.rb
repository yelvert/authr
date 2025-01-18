class CreateApplicationUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :application_users, primary_key: [ :application_id, :user_id ] do |t|
      t.references :application, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :generated, null: false, default: false

      t.index [ :application_id, :user_id ], unique: true
      t.index [ :user_id, :application_id ], unique: true
    end
  end
end
