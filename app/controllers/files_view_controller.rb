class FilesViewController < ApplicationController
	def index
		render 'index'
	end

	def show
		# array = CSV.read(params[:csv_file].path)

		# result = FilesAnalysis.new.doStuff(array)

		# render json: result
		# redirect_to "/files/show"
		@file_id = ProcessFile.find_by(csv_file_file_name: "stroke_data_full.json").id
		render 'show'
	end
end
