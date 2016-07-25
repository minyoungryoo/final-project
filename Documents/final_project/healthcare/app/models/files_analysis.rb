class FilesAnalysis < ApplicationRecord
	def doStuff(array)
		col_array = array.transpose[17]
		result = 0
		col_array.each do |element|
			result += element.to_i
		end
		result
		# puts col_array
	end
end
