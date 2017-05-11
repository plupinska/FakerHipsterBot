class CreateBots < ActiveRecord::Migration
  def change
    create_table :bots do |t|
      t.string :tweet
      
      t.timestamps null: false
    end
  end
end
