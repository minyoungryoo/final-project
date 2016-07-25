class AddAttachmentCsvFileToProcessFiles < ActiveRecord::Migration
  def self.up
    change_table :process_files do |t|
      t.attachment :csv_file
    end
  end

  def self.down
    remove_attachment :process_files, :csv_file
  end
end
