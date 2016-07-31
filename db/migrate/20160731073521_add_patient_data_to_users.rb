class AddPatientDataToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :patient_data, :string
  end
end
