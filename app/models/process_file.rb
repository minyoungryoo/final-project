class ProcessFile < ApplicationRecord
	has_attached_file :csv_file
	validates_attachment_content_type :csv_file, content_type: "application/json"
	validates :csv_file, attachment_presence: true

	def csv_file_instance
		if self.csv_file.options[:storage] == :s3
			tmp_file = Tempfile.new("blah")
			self.csv_file.copy_to_local_file(:original, tmp_file.path)
			File.read(tmp_file.path)
		else
			File.read(self.csv_file.path)
		end
	end
end
