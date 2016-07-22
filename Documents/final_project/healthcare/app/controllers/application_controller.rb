class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
  	devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end


  private
  def after_sign_in_path_for(resource)
	  '/users/' + current_user.id.to_s
  end

  def after_sign_out_path_for(resource)
  	new_user_session_path
  end
end
