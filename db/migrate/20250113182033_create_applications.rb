class CreateApplications < ActiveRecord::Migration[8.0]
  def change
    create_table :applications do |t|
      t.string :name, null: false
      t.column :hostnames, :json_array, null: false, default: [].to_json
      t.boolean :active, null: false, default: true
      t.string :source, null: false, default: "custom"

      t.timestamps

      t.index :name, unique: true
      t.index :active
      t.index :source
    end
  end
end
