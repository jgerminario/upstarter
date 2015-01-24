class CreateStartups < ActiveRecord::Migration
  def change
    create_table :startups do |t|
      t.integer :fundraised
      t.string :name

      t.timestamps null: false
    end
  end
end
