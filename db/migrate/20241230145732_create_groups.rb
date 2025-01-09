class CreateGroups < ActiveRecord::Migration[8.0]
  def change
    create_table :groups do |t|
      t.string :name, null: true

      t.timestamps

      t.index :name, unique: true
    end
  end
end
