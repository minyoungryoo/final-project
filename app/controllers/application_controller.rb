class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
  	devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def authorize_user
  	unless current_user
  		flash[:message] = 'Please log in or register to access this page'
  		redirect_to new_user_session_path
  	end
  	
  end

  def admin_only
  	unless current_user && current_user.role == "admin"
  		flash[:access_denied] = "Access denied. You must be admin to see this page."
  		redirect_to root_path
  	end
  end

  def admin_and_doctor_only
    unless current_user && (current_user.role == "admin" || current_user.role == "doctor")
      flash[:access_denied] = "Access denied. You must be an admin or doctor to see this page."
      redirect_to root_path
    end
  end

  private
  def after_sign_in_path_for(resource)
	  '/users/' + current_user.id.to_s
  end

  def after_sign_out_path_for(resource)
  	new_user_session_path
  end
end
