Rebelchat::App.controllers :chatroom do
  
  get :index do
  	content_type :json
  	Chatroom.all.to_json
  end

  get :index, :with => :id do
  	content_type :json
    Chatroom[params[:id]].to_json
  end
  
end
