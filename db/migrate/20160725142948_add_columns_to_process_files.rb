class AddColumnsToProcessFiles < ActiveRecord::Migration[5.0]
  def change
    add_column :process_files, :original_file_path, :string
  end
end
