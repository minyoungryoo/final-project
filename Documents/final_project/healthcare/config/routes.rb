Rails.application.routes.draw do
  devise_for :users do
  end
  get '/users/:id', to: 'users#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

 #  scope "/users" do
 #  resources :
	# end

	get '/users/:id/upload', to: 'users#upload'
end
