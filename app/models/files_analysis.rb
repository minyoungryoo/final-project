require 'rubygems'
require 'decisiontree'
require 'liblinear'
require 'statsample'

class FilesAnalysis < ApplicationRecord
	def doStuff(training_array, desired_condition)
		# # , patient_condition
		
		# full_attribute_array = training_array[0]
		# attribute_array = full_attribute_array[0..49]

		# # puts "--------------------"
		# # puts attribute_array.length
		# # puts "--------------------"



		# training_array = training_array[1..112]

		# # puts "--------------------"
		# # training_array.each do |row|
		# # row.each do |col|
			# 		puts col
			# 	end
			# end
		# # puts "--------------------"


		attribute_array = ['Temperature']
		training_array = [
		  [36.6, 'healthy'],
		  [37, 'sick'],
		  [38, 'sick'],
		  [36.7, 'healthy'],
		  [40, 'sick'],
		  [50, 'really sick'],
		]


		dec_tree = DecisionTree::ID3Tree.new(attribute_array, training_array, "sick", :continuous)
		dec_tree.train

		# # patient_condition = training_array[4][0..5]
		# # decision = dec_tree.predict(patient_condition)

		test = [37, 'sick']
		decision = dec_tree.predict(test)

		puts "==================="
		puts decision
		puts "====================="

		# # dec_tree.graph("discrete")


		# # puts "==================="
		# # puts decision
		# # puts "====================="


		parameter = { solver_type: Liblinear::L1R_LR  }
		labels = [1, 2, 3, 4, 3]
		training_data = [[-2, -2], [-1, -1], [1, 1], [2, 2], [-2, 3]]
		bias = 0.5
		fold = 3

		model = Liblinear.train(parameter, labels, training_data, bias)

		test_data = [1, 1]

		puts "==================="
		puts Liblinear.predict(model, test_data)
		puts "----------------------"
		puts Liblinear.cross_validation(fold, parameter, labels, training_data)

		puts "==================="

		# Statsample::Analysis.store(Statsample::Graph::Histogram) do
		#   histogram(rnorm(3000,0,20))
		# end

		# a=(1..100).collect { rand(100)}.to_scale
		

	
		# x=100.times.collect {|i| rand(100)}.to_scale
		# y=100.times.collect {|i| 2+x[i]*2+rand()}.to_scale
		# sr=Statsample::Regression.simple(x,y)

		# puts "==================="
		# puts sr.r
		# puts "==================="




	end
end
