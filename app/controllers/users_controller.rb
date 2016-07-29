
class UsersController < ApplicationController
	before_action :authenticate_user!, only: [:show, :index, :upload]
	# before_action :authorize_user, only: :index
	before_action :admin_only, only: [:upload]
	before_action :admin_and_doctor_only, only: [:index, :upload]

	def home
		render 'home'
	end

	def index
		@all_users = User.all
		render 'index'
	end

	def profile
		@user = User.find(params[:id])
		render 'profile'
	end

	def show
		@user = User.find(params[:id])
		render 'users/show'
	end

	def upload
		render 'upload'
	end
end
