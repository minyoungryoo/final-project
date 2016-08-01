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
		# puts "PRTY IMPORTANT STUFF*************************"
		# p FilesAnalysis.find(session[:data_id])
		# puts "PRTY IMPORTANT STUFF*************************"

	end

	def show
		file = ProcessFile.find(params[:id])
		array = File.read(file.csv_file.path)
		readable_array = JSON.parse(array)
		col_numA = params[:num_idA]
		col_numB = params[:num_idB]
		patient_id = params[:patient_id]
		# session[:test] = [1,2,3]
		# session[:testB] = [4,5,6]



		attr_arr = FilesAnalysis.find_by(patient_id: patient_id).patient_attr_data
		data_arr = FilesAnalysis.find_by(patient_id: patient_id).patient_data

		# puts "**************PARAMS*****************"
		# # p session[:patient_id_file]
		# p attr_arr.length
		# p data_arr
		# puts "*******************************"

		if data_arr.length > 0 
			# do analysis
			# result = [[[[2, 0.0, 1.0588235294117647], [2, 0.0, 1.5], [2, 1.0, 0.3157894736842105], [2, 0.0, 1.2], [2, 0.0, 0.5238095238095238], [2, 0.0, 0.7272727272727273], [2, 1.0, 0.8695652173913043], [2, 0.0, 1.0], [2, 0.0, 0.76], [2, 0.0, 0.7692307692307693], [2, 0.0, 0.8148148148148148], [2, 0.0, 0.6428571428571429], [2, 0.0, 0.6206896551724138], [2, 0.0, 1.8], [2, 0.0, 0.3548387096774194], [2, 2.0, 0.71875]], [1.0196078431372548, 1.1666666666666667, 1.105263157894737, 1.0666666666666667, 0.8412698412698413, 0.9090909090909092, 1.289855072463768, 1.0, 0.9199999999999999, 0.923076923076923, 0.9382716049382717, 0.8809523809523809, 0.8735632183908045, 1.2666666666666666, 0.7849462365591399, 1.5729166666666667], [0.24267545533047236, 0.24532669073132915, 0.19432088539939704, 0.22509257354845508, 0.22631476077857163, 0.21582751830083627, 0.12895612191203784, 0.20412414523193154, 0.2019108714259834, 0.197849153814207, 0.1935469303095448, 0.19295789759155835, 0.190096053690385, 0.2011080417199781, 0.19166034839134405, 0.1307670305392061]], [0, 0, 0]]
			result = FilesAnalysis.new.doStuff(readable_array, col_numA, col_numB, attr_arr, data_arr)
			# puts "\n\n~~~~~~~~~~~~~~~~~~~~~~~~~hiiiii~~~~~~~~~~~~~~~~~~~~~~~"
			# puts result.length
			# result.each{|x|
			# 	puts "x: #{x.length}"
			# 	x.each{|y| puts y.length}
			# }
			# p result
			# puts "\n\n"
			# session[:test] << 1
		end
		# result = FilesAnalysis.new.doStuff(readable_array, col_numA)
		puts "Session test"
		# p session[:test]
		# p session[:testB]
		p col_numA
		p col_numB
		puts "end ************"
		# result = readable_array[0]
		render json: result
	end

	private
	def process_file_params
	  params.require(:process_file).permit(:csv_file)
	end

end
