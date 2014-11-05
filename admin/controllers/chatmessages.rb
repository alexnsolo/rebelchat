Rebelchat::Admin.controllers :chatmessages do
  get :index do
    @title = "Chatmessages"
    @chatmessages = Chatmessage.all
    render 'chatmessages/index'
  end

  get :new do
    @title = pat(:new_title, :model => 'chatmessage')
    @chatmessage = Chatmessage.new
    render 'chatmessages/new'
  end

  post :create do
    @chatmessage = Chatmessage.new(params[:chatmessage])
    if (@chatmessage.save rescue false)
      @title = pat(:create_title, :model => "chatmessage #{@chatmessage.id}")
      flash[:success] = pat(:create_success, :model => 'Chatmessage')
      params[:save_and_continue] ? redirect(url(:chatmessages, :index)) : redirect(url(:chatmessages, :edit, :id => @chatmessage.id))
    else
      @title = pat(:create_title, :model => 'chatmessage')
      flash.now[:error] = pat(:create_error, :model => 'chatmessage')
      render 'chatmessages/new'
    end
  end

  get :edit, :with => :id do
    @title = pat(:edit_title, :model => "chatmessage #{params[:id]}")
    @chatmessage = Chatmessage[params[:id]]
    if @chatmessage
      render 'chatmessages/edit'
    else
      flash[:warning] = pat(:create_error, :model => 'chatmessage', :id => "#{params[:id]}")
      halt 404
    end
  end

  put :update, :with => :id do
    @title = pat(:update_title, :model => "chatmessage #{params[:id]}")
    @chatmessage = Chatmessage[params[:id]]
    if @chatmessage
      if @chatmessage.modified! && @chatmessage.update(params[:chatmessage])
        flash[:success] = pat(:update_success, :model => 'Chatmessage', :id =>  "#{params[:id]}")
        params[:save_and_continue] ?
          redirect(url(:chatmessages, :index)) :
          redirect(url(:chatmessages, :edit, :id => @chatmessage.id))
      else
        flash.now[:error] = pat(:update_error, :model => 'chatmessage')
        render 'chatmessages/edit'
      end
    else
      flash[:warning] = pat(:update_warning, :model => 'chatmessage', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy, :with => :id do
    @title = "Chatmessages"
    chatmessage = Chatmessage[params[:id]]
    if chatmessage
      if chatmessage.destroy
        flash[:success] = pat(:delete_success, :model => 'Chatmessage', :id => "#{params[:id]}")
      else
        flash[:error] = pat(:delete_error, :model => 'chatmessage')
      end
      redirect url(:chatmessages, :index)
    else
      flash[:warning] = pat(:delete_warning, :model => 'chatmessage', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy_many do
    @title = "Chatmessages"
    unless params[:chatmessage_ids]
      flash[:error] = pat(:destroy_many_error, :model => 'chatmessage')
      redirect(url(:chatmessages, :index))
    end
    ids = params[:chatmessage_ids].split(',').map(&:strip)
    chatmessages = Chatmessage.where(:id => ids)
    
    if chatmessages.destroy
    
      flash[:success] = pat(:destroy_many_success, :model => 'Chatmessages', :ids => "#{ids.to_sentence}")
    end
    redirect url(:chatmessages, :index)
  end
end
