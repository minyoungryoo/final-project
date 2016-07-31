require 'csv'

class FilesController < ApplicationController

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

	def create_patient_data
		patient_id = params[:basic_patient_id]
		attr_arr = params[:basic_attr]
		index_arr = params[:basic_index]

		puts "Patient id:"
		p patient_id
		if patient_id != nil && (FilesAnalysis.find_by(patient_id: patient_id))
			session[:data_id] = FilesAnalysis.find_by(patient_id: patient_id).id
		elsif patient_id != nil
			patient_data = FilesAnalysis.create(patient_id: patient_id)
			session[:data_id] = patient_data.id
		end

		if index_arr && index_arr.length == 15	
			data_id = session[:data_id]
			file = FilesAnalysis.find(data_id).update(patient_attr_data: attr_arr, patient_data: index_arr)
		end
		puts "PRTY IMPORTANT STUFF*************************"
		p FilesAnalysis.find(session[:data_id])
		puts "PRTY IMPORTANT STUFF*************************"

	end

	def show
		file = ProcessFile.find(params[:id])
		array = File.read(file.csv_file.path)
		readable_array = JSON.parse(array)
		col_num = params[:num_id]

		# puts "**************PARAMS*****************"
		# p col_num
		# puts "*******************************"

		result = FilesAnalysis.new.doStuff(readable_array, col_num)

		result = readable_array[0]
		render json: result
	end

	private
	def process_file_params
	  params.require(:process_file).permit(:csv_file)
	end

end
