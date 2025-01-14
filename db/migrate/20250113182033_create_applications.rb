class CreateApplications < ActiveRecord::Migration[8.0]
  def change
    create_table :applications do |t|
      t.string :name, null: false
      # t.text :hostnames_raw, null: false, default: [].to_json
      # t.virtual :hostnames, type: :array, as: "json(hostnames_raw)", stored: true
      t.column :hostnames, :json_array, null: false, default: [].to_json

      t.timestamps

      t.index :name, unique: true
    end
  end
end
