class CreateExpressions < ActiveRecord::Migration[6.1]
  def change
    create_table :expressions do |t|
      t.references :participant, null: false, foreign_key: true
      t.integer :engagement_score, default: 0
      t.decimal :confident, precision: 20, scale: 19
      t.string :emotion

      t.timestamps
    end
  end
end
