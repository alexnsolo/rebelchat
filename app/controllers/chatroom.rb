Rebelchat::App.controllers :chatroom do
  
  get :index do
  	content_type :json
  	Chatroom.all.to_json
  end

  post :index do
    json_data = JSON.parse(request.body.read)
    # This is dumb, why does Sequel complain about the id being reserved? 
    # Can't it tell that id=null means to create a new one?
    json_data.delete("id") 
    chatroom = Chatroom.from_json(json_data.to_json)
    if (chatroom.save rescue false)
      chatroom.to_json
    else
      :error
    end
  end

  get :index, :with => :id do
  	content_type :json
    Chatroom[params[:id]].to_json
  end
  
end
