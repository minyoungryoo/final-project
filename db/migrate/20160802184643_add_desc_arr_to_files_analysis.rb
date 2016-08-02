class AddDescArrToFilesAnalysis < ActiveRecord::Migration[5.0]
  def change
    add_column :files_analyses, :patient_desc, :string, array: true, default: []
  end
end
