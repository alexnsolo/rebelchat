Rebelchat::App.controllers :chatroom do
  
  get :index do
  	content_type :json
  	Chatroom.all.to_json
  end

  post :index do
    chatroom = Chatroom.from_json(request.body.read)
    if (chatroom.save rescue false)
      chatroom.to_json
    else
      halt 500
    end
  end

  delete :index, :with => :id do
    chatroom = Chatroom[params[:id]]
    if chatroom
      if !chatroom.destroy
        halt 500
      end
    else
      halt 404
    end
  end

  get :index, :with => :id do
  	content_type :json
    Chatroom[params[:id]].to_json
  end
  
end
