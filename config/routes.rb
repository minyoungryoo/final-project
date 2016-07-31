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
	get '/api/files/:id', to: 'files#show'

	post '/api/files/:id', to: 'files#create_patient_data'

	get '/files/:id', to: 'files_view#show'

	get '/users/:id/files', to: 'users#profile'

	get '/users/:id/files/:files_id', to: 'files_view#show'

	get '/users/:id/health_record', to: 'users#health_record'

	get '/users/:id/patient_profile/:patient_id', to: 'users#patient_profile_edit'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

 #  scope "/users" do
 #  resources :
	# end
end
