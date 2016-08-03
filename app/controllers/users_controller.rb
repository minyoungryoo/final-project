
class UsersController < ApplicationController
	before_action :authenticate_user!, only: [:show, :index, :upload]
	# before_action :authorize_user, only: :index
	before_action :admin_only, only: [:upload]
	before_action :admin_and_doctor_only, only: [:index, :upload, :patient_profile_edit]

	def home
		render 'home'
	end

	def index
		@all_users = User.all
		render 'index'
	end

	def profile
		@user = User.find(params[:id])
		@patient_id = @user.id
		patient = FilesAnalysis.find_by(patient_id: @patient_id)

		@attr_arr = patient.patient_attr_data
		@data_arr = patient.patient_data
		@desc_arr = patient.patient_desc

		@condition_name = ["Conscious state","Patient's gender", "Age in years", "Symptoms noted on Walking", "Atrial Fibrillation", "Infarct visible on CT", "Systolic blood pressure", "Face deficit", "Arm/hand deficit", "Leg/foot deficit", "Dysphasia", "Hemianopia", "Visuospatial Disorder", "Brainstem/cerebellar signs", "Other deficit"]

		@file_id = ProcessFile.find_by(csv_file_file_name: "stroke_data_full.json").id
		render 'profile'
	end

	def show
		@user = User.find(params[:id])
		render 'users/show'
	end

	def upload
		render 'upload'
	end

	def patient_profile_edit
		@all_users = User.all 
		select_patient_id = params[:patient_id]
		@select_patient = User.find(select_patient_id)
		render 'patient_profile_edit'
	end
end
