require 'liblinear'

class FilesAnalysis < ApplicationRecord
	def doStuff(full_training_array, col_nums)
	# def doStuff(full_training_array, col_nums, attribute_array, patient_condition)
		# attribute_array
		# training_array   #>> make with with full_training_array AND col_nums AND [0-13]; use push
		# patient_condition

		if col_nums != nil

			puts "@@@@@@@@@@@@@@@@@@@@@@@@@@COLNUMS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
			p col_nums
			puts "@@@@@@@@@@@@@@@@@@@@@@@@@@COLNUMS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

		full_attribute_array = full_training_array[0]
		full_attribute_array = full_attribute_array[0..49]
		outputs_array = 
		
		attribute_array = []
			col_nums.each do |i|
				attribute_array = attribute_array.push(full_attribute_array[i.to_i])
			end

		full_training_array = full_training_array[1..112]
		full_training_array.each do |row|
			row.map! do |element|
				element.to_i #changed from f
			end
		end

		training_array = []
		full_training_array = Matrix[ *full_training_array ]
			col_nums.each do |i|
				training_array = training_array.push(full_training_array.column(i.to_i).to_a)
			end
		#pushing final decision into array:
		training_array = training_array.push(full_training_array.column(50).to_a)
		training_array = training_array.transpose

		puts "MATRIX **********************************************"
		puts "training arr"
		p training_array.length
		puts "attr arr"
		p attribute_array
		puts "MATRIX **********************************************"


		dec_tree = DecisionTree::ID3Tree.new(attribute_array, training_array, "4", :continuous)
		dec_tree.train

		patient_condition = training_array[1].reverse.drop(1).reverse
		# puts "Training ARR *********************************"
		# p training_array

		puts "PATIENT CONDITION***************************"
		p patient_condition
		puts "PATIENT CONDITION***************************"

		decision = dec_tree.predict(patient_condition)

		puts "========DECISION==========="
		puts decision
		puts "========ACTUAL DECISION==========="
		p training_array[1]
		puts "========+++++++++++++============="

		# # # dec_tree.graph("discrete")


		parameter = { solver_type: Liblinear::L1R_LR  }
		attribute_labels = training_array.transpose[-1]
		puts "ATTR LAB ++++++++++++++++++++"
		p attribute_labels
		puts "++++++ ++++++++++++++++++++"
		# bias = -1
		fold = 3

		model = Liblinear.train(parameter, attribute_labels, training_array)

		puts "=========PREDICT UINSG LABLINEAR=========="
		puts Liblinear.predict(model, patient_condition)
		puts "----------PREDICT USING CROSS VAL------------"
		puts Liblinear.cross_validation(fold, parameter, attribute_labels, training_array).mean
		puts "==================="






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
