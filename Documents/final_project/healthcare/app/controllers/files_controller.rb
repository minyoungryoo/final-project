require 'csv'

class FilesController < ApplicationController
	def index
		render 'index'
	end

	def create
		array = CSV.read(params[:csv_file].path)

		puts array
	end
end
