Rebelchat::Admin.controllers :chatrooms do
  get :index do
    @title = "Chatrooms"
    @chatrooms = Chatroom.all
    render 'chatrooms/index'
  end

  get :new do
    @title = pat(:new_title, :model => 'chatroom')
    @chatroom = Chatroom.new
    render 'chatrooms/new'
  end

  post :create do
    @chatroom = Chatroom.new(params[:chatroom])
    if (@chatroom.save rescue false)
      @title = pat(:create_title, :model => "chatroom #{@chatroom.id}")
      flash[:success] = pat(:create_success, :model => 'Chatroom')
      params[:save_and_continue] ? redirect(url(:chatrooms, :index)) : redirect(url(:chatrooms, :edit, :id => @chatroom.id))
    else
      @title = pat(:create_title, :model => 'chatroom')
      flash.now[:error] = pat(:create_error, :model => 'chatroom')
      render 'chatrooms/new'
    end
  end

  get :edit, :with => :id do
    @title = pat(:edit_title, :model => "chatroom #{params[:id]}")
    @chatroom = Chatroom[params[:id]]
    if @chatroom
      render 'chatrooms/edit'
    else
      flash[:warning] = pat(:create_error, :model => 'chatroom', :id => "#{params[:id]}")
      halt 404
    end
  end

  put :update, :with => :id do
    @title = pat(:update_title, :model => "chatroom #{params[:id]}")
    @chatroom = Chatroom[params[:id]]
    if @chatroom
      if @chatroom.modified! && @chatroom.update(params[:chatroom])
        flash[:success] = pat(:update_success, :model => 'Chatroom', :id =>  "#{params[:id]}")
        params[:save_and_continue] ?
          redirect(url(:chatrooms, :index)) :
          redirect(url(:chatrooms, :edit, :id => @chatroom.id))
      else
        flash.now[:error] = pat(:update_error, :model => 'chatroom')
        render 'chatrooms/edit'
      end
    else
      flash[:warning] = pat(:update_warning, :model => 'chatroom', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy, :with => :id do
    @title = "Chatrooms"
    chatroom = Chatroom[params[:id]]
    if chatroom
      if chatroom.destroy
        flash[:success] = pat(:delete_success, :model => 'Chatroom', :id => "#{params[:id]}")
      else
        flash[:error] = pat(:delete_error, :model => 'chatroom')
      end
      redirect url(:chatrooms, :index)
    else
      flash[:warning] = pat(:delete_warning, :model => 'chatroom', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy_many do
    @title = "Chatrooms"
    unless params[:chatroom_ids]
      flash[:error] = pat(:destroy_many_error, :model => 'chatroom')
      redirect(url(:chatrooms, :index))
    end
    ids = params[:chatroom_ids].split(',').map(&:strip)
    chatrooms = Chatroom.where(:id => ids)
    
    if chatrooms.destroy
    
      flash[:success] = pat(:destroy_many_success, :model => 'Chatrooms', :ids => "#{ids.to_sentence}")
    end
    redirect url(:chatrooms, :index)
  end
end
