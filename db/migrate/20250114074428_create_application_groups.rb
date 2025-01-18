class CreateApplicationGroups < ActiveRecord::Migration[8.0]
  def change
    create_table :application_groups, primary_key: [ :application_id, :group_id ] do |t|
      t.references :application, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true
      t.boolean :generated, null: false, default: false

      t.index [ :application_id, :group_id ], unique: true
      t.index [ :group_id, :application_id ], unique: true
    end
  end
end
