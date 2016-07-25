Rails.application.routes.draw do
  devise_for :users 

  
    get '/', to: 'users#home', as: :root

    get '/users', to: 'users#index'

    get '/users/:id', to: 'users#show'

	get '/users/:id/upload', to: 'users#upload', as: :upload

	get '/users/:id/profile', to: 'users#profile'

	# get '/api/files', to: 'files#index'

	post '/api/files', to: 'files#create'

	# , as: :files_root
	get '/files', to: 'files_view#show'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

 #  scope "/users" do
 #  resources :
	# end
end
