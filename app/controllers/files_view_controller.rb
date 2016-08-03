class FilesViewController < ApplicationController
	def index
		render 'index'
	end

	def show
		@file_id = ProcessFile.find_by(csv_file_file_name: "stroke_data_full.json").id
		# @disease_name = params[:disease_name]
		session[:disease_name] = params[:disease_name]

		@disease_name = session[:disease_name]

		@patient_id = params[:patient_id]

		@content_label = ["Varying Dosages of Hep/Asp", "Heparin", "Aspirin", "Followup to treatment", "Subcutaneous Heparin", 
		"Antiplatelet Drug", "Intravenous Heparin", "Other Anticoagulants", "Calcium Antagonists", "Glycerol or manitol", "Steroids", 
		"Haemodilution", "Carotid Surgery", "Thrombolysis", "Medication Taken at 6-months Followup"];

		@result_data_arr = params[:result_data_arr]
		render 'show'
	end
end
