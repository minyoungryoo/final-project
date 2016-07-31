class AddPatientAttrDataToFilesAnalyses < ActiveRecord::Migration[5.0]
  def change
    add_column :files_analyses, :patient_attr_data, :string, array: true, default: []
  end
end
