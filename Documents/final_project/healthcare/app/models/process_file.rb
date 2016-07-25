class ProcessFile < ApplicationRecord
	has_attached_file :csv_file
	validates_attachment_content_type :csv_file, content_type: "application/json"
	validates :csv_file, attachment_presence: true
end
