require 'csv'
require 'rubygems'
require 'decisiontree'
# include DecisionTree

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
	  # array = CSV.read(old_file.csv_file.path)
	  # file = JSON.generate(array)

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
		array = File.read(file.csv_file.path)
		readable_array = JSON.parse(array)


		result = FilesAnalysis.new.doStuff(readable_array, '3')
		puts "========================="
		puts result
		puts "========================="


		result = readable_array[0]
		render json: result
	end

	private
	def process_file_params
	  params.require(:process_file).permit(:csv_file)
	end

end
