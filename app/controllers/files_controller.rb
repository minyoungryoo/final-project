require 'csv'

class FilesController < ApplicationController

	def create
	  file = ProcessFile.new( process_file_params )
	  # array = CSV.read(old_file.csv_file.path)
	  # file = JSON.generate(array)

	  if file.save
		  redirect_to "/users"
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
		desc_arr = params[:basic_diag_desc]

		if patient_id != nil && (FilesAnalysis.find_by(patient_id: patient_id))
			session[:data_id] = FilesAnalysis.find_by(patient_id: patient_id).id
		elsif patient_id != nil
			patient_data = FilesAnalysis.create(patient_id: patient_id)
			session[:data_id] = patient_data.id
		end


		if index_arr && index_arr.length == 15	
			data_id = session[:data_id]
			file = FilesAnalysis.find(data_id).update(patient_attr_data: attr_arr, patient_data: index_arr, patient_desc: desc_arr)
		end
	end

	def show
		file = ProcessFile.find(params[:id])
		array = file.csv_file_instance
		readable_array = JSON.parse(array)
		col_numA = params[:num_idA]
		col_numB = params[:num_idB]
		patient_id = params[:patient_id]

		attr_arr = FilesAnalysis.find_by(patient_id: patient_id).patient_attr_data
		data_arr = FilesAnalysis.find_by(patient_id: patient_id).patient_data

		if data_arr.length > 0 
			result = FilesAnalysis.new.doStuff(readable_array, col_numA, col_numB, attr_arr, data_arr)
		end
		# test_result = result
			# puts "\n\n~~~~~~~~~~~~~~~~~~~~~~~~~hiiiii~~~~~~~~~~~~~~~~~~~~~~~"
			# p result
			# puts "\n\n"
		# puts "Session test"
		# p col_numA
		# p col_numB
		# puts "end ************"
		# result = readable_array[0]
		render json: result
	end

	private
	def process_file_params
	  params.require(:process_file).permit(:csv_file)
	end

end
