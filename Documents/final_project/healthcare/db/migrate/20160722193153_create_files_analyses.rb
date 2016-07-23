class CreateFilesAnalyses < ActiveRecord::Migration[5.0]
  def change
    create_table :files_analyses do |t|

      t.timestamps
    end
  end
end
