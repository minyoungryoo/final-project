class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # has_many :
  validates :name, presence: true

  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
  	unless self.role
  		self.role = :user
  	end
  end
end
