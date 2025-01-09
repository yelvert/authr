class CreateUserGroups < ActiveRecord::Migration[8.0]
  def change
    create_table :user_groups, primary_key: [ :user_id, :group_id ] do |t|
      t.references :user, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true

      t.index [ :user_id, :group_id ], unique: true
      t.index [ :group_id, :user_id ], unique: true
    end
  end
end
