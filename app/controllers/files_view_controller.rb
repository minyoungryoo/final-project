class FilesViewController < ApplicationController
	def index
		render 'index'
	end

	def show
		# array = CSV.read(params[:csv_file].path)

		# result = FilesAnalysis.new.doStuff(array)

		# render json: result
		# redirect_to "/files/show"

		render 'show'
	end
end
