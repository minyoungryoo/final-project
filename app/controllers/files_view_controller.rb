class FilesViewController < ApplicationController
	def index
		render 'index'
	end

	def show
		@file_id = ProcessFile.find_by(csv_file_file_name: "stroke_data_full.json").id
		@disease_name = params[:disease_name]
		@lala = "whoo"

		puts "/n/n ~~~~~~~~~~~~~~~diesear~~~~~~~~~~~"
		p @disease_name
		puts "/n/n ~~~~~~~~~~~~~~~diesear~~~~~~~~~~~"

		@result_data_arr = params[:result_data_arr]
		render 'show'
	end
end
