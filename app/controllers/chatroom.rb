Rebelchat::App.controllers :chatroom do
  
  get :index do
  	content_type :json
  	Chatroom.all.to_json
  end

  post :index do
  	@chatroom = Chatroom.new(params[:chatroom])
    if (@chatroom.save rescue false)
      @chatroom.to_json
    else
      :error
    end
  end

  get :index, :with => :id do
  	content_type :json
    Chatroom[params[:id]].to_json
  end
  
end
