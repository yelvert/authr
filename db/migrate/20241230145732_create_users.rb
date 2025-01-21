class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username, null: false
      t.string :password_digest

      t.timestamps

      t.index :username, unique: true
    end
  end
end
