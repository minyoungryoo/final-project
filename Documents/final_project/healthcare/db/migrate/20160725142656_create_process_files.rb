class CreateProcessFiles < ActiveRecord::Migration[5.0]
  def change
    create_table :process_files do |t|
      t.timestamps
    end
  end
end
