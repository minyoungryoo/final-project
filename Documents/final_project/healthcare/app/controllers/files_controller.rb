require 'csv'

class FilesController < ApplicationController
	# def index
	# 	redirect_to '/files'
	# end

	def create
		array = CSV.read(params[:csv_file].path)

		result = FilesAnalysis.new.doStuff(array)

		render json: result
		# redirect_to "/files"
	end

end
