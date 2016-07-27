require 'liblinear'

class FilesAnalysis < ApplicationRecord
	def doStuff(training_array, desired_condition)
		# # , patient_condition
		
		full_attribute_array = training_array[0]
		attribute_array = full_attribute_array[0..49]

		puts "-------------FIRST-------"
		puts attribute_array
		puts "--------------------"

		training_array = training_array[1..112]
		training_array.each do |row|
			row.map! do |element|
				element.to_f
			end
		end

		training_array.each do |row|
			p row
		end

		dec_tree = DecisionTree::ID3Tree.new(attribute_array, training_array, "sick", :continuous)
		dec_tree.train

		patient_condition = training_array[4][0..49]

		puts "Patient condition****"
		p patient_condition

		decision = dec_tree.predict(patient_condition)

		puts "========DECISION==========="
		puts decision
		puts "========ACTUAL DECISION==========="
		puts training_array[4][50]
		puts "========+++++++++++++============="

		# # dec_tree.graph("discrete")


		parameter = { solver_type: Liblinear::L1R_LR  }
		labels = [1, 2, 3, 4, 3]
		attribute_labels = training_array.transpose[50]
		puts "ATTR LAB ++++++++++++++++++++"
		p attribute_labels
		puts "++++++ ++++++++++++++++++++"

		training_data = [[-2, -2], [-1, -1], [1, 1], [2, 2], [-2, 3]]
		bias = 0.5
		fold = 3

		model = Liblinear.train(parameter, attribute_labels, training_array, bias)

		# test_data = [1, 1]

		puts "=========PREDICT UINSG LABLINEAR=========="
		puts Liblinear.predict(model, patient_condition)
		puts "----------PREDICT USING CROSS VAL------------"
		puts Liblinear.cross_validation(fold, parameter, attribute_labels, training_array).mean
		puts "==================="






		# Statsample::Analysis.store(Statsample::Graph::Histogram) do
		#  hist = histogram(rnorm(3000,0,20))
 	# 	 puts "**======================**"
	 #     puts hist
		#  puts "**======================**"
		# end

		a=(1..100).collect { rand(100)}.to_numeric
			         
	    # Calculate correlation coefficient
	    b=(1..100).collect { rand(100)}.to_scale
	    Statsample::Bivariate.pearson(a,b)
	    # Creates a dataset
	    ds={"a"=>a,"b"=>b}.to_dataset
	    
	    # Creates a new vector based on previous vectors and add it to the dataset 
	    ds['c']=ds.collect {|r| r['a']*10+r['b']*5+rand(10) }

	    # OLS 
	    lr=Statsample::Regression.multiple(ds,"c")


		puts "******===================******"
		puts lr.sse
		puts "******===================******"

		# ss_analysis("Statsample::Bivariate.correlation_matrix") do
		#   samples=1000
		#   ds=data_frame(
		#     'a'=>rnorm(samples), 
		#     'b'=>rnorm(samples),
		#     'c'=>rnorm(samples),
		#     'd'=>rnorm(samples))
		#   cm=cor(ds) 
		#  sum = summary(cm)

		# # puts "******===================******"
		# # puts sum
		# # puts "******===================******"

		# end

		# Statsample::Analysis.run_batch




	
		# x=100.times.collect {|i| rand(100)}.to_scale
		# y=100.times.collect {|i| 2+x[i]*2+rand()}.to_scale
		# sr=Statsample::Regression.simple(x,y)

		# puts "==================="
		# puts sr.r
		# puts "==================="

		# ss_analysis(Statsample::Graph::Boxplot) do 
		#   n=30
		#   a=rnorm(n-1,50,10)
		#   b=rnorm(n, 30,5)
		#   c=rnorm(n,5,1)
		#   a.push(2)
		#   boxplot(:vectors=>[a,b,c], :width=>300, :height=>300, :groups=>%w{first first second}, :minimum=>0)
		# end
		# Statsample::Analysis.run # Open svg file on *nix application defined


	end
end
