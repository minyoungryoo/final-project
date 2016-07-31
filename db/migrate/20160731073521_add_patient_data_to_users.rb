class AddPatientDataToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :files_analyses, :patient_data, :string, array: true, default: []
    add_column :files_analyses, :patient_id, :integer
  end
end
