require 'csv'

class FilesController < ApplicationController
	# # def index
	# # 	redirect_to '/files'
	# # end

	# def create
	# 	array = CSV.read(params[:csv_file].path)



	# 	result = FilesAnalysis.new.doStuff(array)

	# 	render json: result
	# 	# redirect_to "/files"
	# end

	def create
	  file = ProcessFile.new( process_file_params )

	  if file.save
		  redirect_to "/files/#{file.id}"
	  else
	  	@file = file
	  	flash.now[:alert] = "Error uploading file"
	  	render "users/upload"
	  end
	end

	def show
		file = ProcessFile.find(params[:id])
		# array = CSV.read(file.csv_file.path)
		array = IO.read(file.csv_file.path)
		# result = FilesAnalysis.new.doStuff(array)
		# render json: result
		render json: array
	end

	private
	def process_file_params
	  params.require(:process_file).permit(:csv_file)
	end

end
