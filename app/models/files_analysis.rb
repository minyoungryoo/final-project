require 'liblinear'

class FilesAnalysis < ApplicationRecord
	# def doStuff(full_training_array, col_numsA)
	def doStuff(full_training_array, col_numsA, col_numsB, basic_attribute_array, basic_patient_condition)

		# 19-25, 30-37, 50

		if col_numsA != nil

		full_attribute_array = full_training_array[0]
		full_attribute_array = full_attribute_array[0..49]
		
		attribute_array = basic_attribute_array
			col_numsA.each do |i|
				attribute_array = attribute_array.push(full_attribute_array[i.to_i])
			end


		full_training_array = full_training_array[1..119]
		# full_training_array.shift

		# puts "full training_array"
		# p full_training_array
		# puts "end **************************"
		full_training_array.each do |row|
			row.map! do |element|
				element.to_i #changed from f
			end
		end

		basic_training_array = full_training_array.transpose[0..14]
		training_array = basic_training_array
		full_training_array = Matrix[ *full_training_array ]
			col_numsA.each do |i|
				tr_cols = full_training_array.column(i.to_i).to_a
				training_array = training_array.push(tr_cols)
			end
		#pushing final decision into array:
				# 19-25, 30-37, 50

		# patient_condition.fill(0, patient_condition.size, 35)
		patient_condition = basic_patient_condition.map(&:to_i)
		col_numsA.each do |i|
			# patient_condition[i.to_i] = 1
			patient_condition = patient_condition.push(1)
		end

		# puts "PAtient condition"
		# p patient_condition
		# puts "End **********************"

		full_decision_arr = []
		mean_result_arr = []
		std_result_arr = []
		parameter = { solver_type: Liblinear::L1R_LR  }
		fold = 3
		n = -1
		for i in 19..50
			if (i >= 19 && i <= 25) || (i >= 30 && i <= 37) || i == 50
				# i = 50
				# puts "i is:"
				# p i
				# puts "end"
				# puts "training array before"
				# p training_array
				# puts "end *************************"
				# training_array = training_array.transpose
				# puts "training array after"
				# p training_array
				# puts "End@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

				training_array = training_array.push(full_training_array.column(i).to_a)
				if i == 50
					dec_tree = DecisionTree::ID3Tree.new(attribute_array, training_array, "4", :continuous)
				else
					dec_tree = DecisionTree::ID3Tree.new(attribute_array, training_array, "1", :continuous)
				end
				dec_tree.train
				decision = dec_tree.predict(patient_condition)

				# puts "Training array size"
				# p training_array.transpose.size
				# puts "end ***********************************"

				attribute_labels = training_array.transpose[n]
				model = Liblinear.train(parameter, attribute_labels, training_array)
				lablinear_result = Liblinear.predict(model, patient_condition)
				crossVal_result = Liblinear.cross_validation(fold, parameter, attribute_labels, training_array).mean
				full_result = [decision, lablinear_result, crossVal_result]
				mean_result = full_result.mean
				std_result = full_result.sd/(Math.sqrt(training_array.length))
				full_decision_arr = full_decision_arr.push(full_result)
				mean_result_arr = mean_result_arr.push(mean_result)
				std_result_arr = std_result_arr.push(std_result)
				n -= 1
			end
		end

		result = [full_decision_arr, mean_result_arr, std_result_arr]

		# puts "==========DECISOIN+++++++++++++++"
		# p full_decision_arr
		# p mean_result_arr
		# p std_result_arr
		# puts "==========DECISOIN+++++++++++++++"

		# puts "Training arrays all"
		# p all_training_arr.length
		# puts "End **********************"

		# training_array = training_array.push(full_training_array.column(50).to_a)




		# 0-14, 15-18, ... 26-29, 38-49 // not these

		# IF WANT TO TEST ***************************
				# patient_condition = training_array[1].reverse.drop(1).reverse
		#USE THIS



		# puts "========DECISION==========="
		# puts decision
		# # puts "========ACTUAL DECISION==========="
		# # p training_array[1]
		# puts "========+++++++++++++============="

		# # # dec_tree.graph("discrete")


		# puts "ATTR LAB ++++++++++++++++++++"
		# p attribute_labels
		# puts "++++++ ++++++++++++++++++++"
		# bias = -1

		# puts "=========PREDICT UINSG LABLINEAR=========="
		# puts lablinear_result
		# puts "----------PREDICT USING CROSS VAL------------"
		# puts crossVal_result
		# puts "==================="



		# lr=Statsample::Regression::Binomial::Logit(training_array,attribute_labels)
		# std_result = lr.standard_error





		# # Statsample::Analysis.store(Statsample::Graph::Histogram) do
		# #  hist = histogram(rnorm(3000,0,20))
 	# # 	 puts "**======================**"
	 # #     puts hist
		# #  puts "**======================**"
		# # end

		# a=(1..100).collect { rand(100)}.to_numeric
			         
	 #    # Calculate correlation coefficient
	 #    b=(1..100).collect { rand(100)}.to_scale
	 #    Statsample::Bivariate.pearson(a,b)
	 #    # Creates a dataset
	 #    ds={"a"=>a,"b"=>b}.to_dataset
	    
	 #    # Creates a new vector based on previous vectors and add it to the dataset 
	 #    ds['c']=ds.collect {|r| r['a']*10+r['b']*5+rand(10) }

	 #    # OLS 
	 #    lr=Statsample::Regression.multiple(ds,"c")


		# puts "******===================******"
		# puts lr.sse
		# puts "******===================******"



		# # ss_analysis("Statsample::Bivariate.correlation_matrix") do
		# #   samples=1000
		# #   ds=data_frame(
		# #     'a'=>rnorm(samples), 
		# #     'b'=>rnorm(samples),
		# #     'c'=>rnorm(samples),
		# #     'd'=>rnorm(samples))
		# #   cm=cor(ds) 
		# #  sum = summary(cm)

		# # # puts "******===================******"
		# # # puts sum
		# # # puts "******===================******"

		# # end

		# # Statsample::Analysis.run_batch




	
		# # x=100.times.collect {|i| rand(100)}.to_scale
		# # y=100.times.collect {|i| 2+x[i]*2+rand()}.to_scale
		# # sr=Statsample::Regression.simple(x,y)

		# # puts "==================="
		# # puts sr.r
		# # puts "==================="

		# # ss_analysis(Statsample::Graph::Boxplot) do 
		# #   n=30
		# #   a=rnorm(n-1,50,10)
		# #   b=rnorm(n, 30,5)
		# #   c=rnorm(n,5,1)
		# #   a.push(2)
		# #   boxplot(:vectors=>[a,b,c], :width=>300, :height=>300, :groups=>%w{first first second}, :minimum=>0)
		# # end
		# # Statsample::Analysis.run # Open svg file on *nix application defined

		else
			result = 0
		end
	end
end
