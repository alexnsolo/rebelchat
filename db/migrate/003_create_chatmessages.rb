Sequel.migration do
  up do
    create_table :chatmessages do
      primary_key :id
      String :author
      Text :content
      Chatroom :chatroom 
    end
  end

  down do
    drop_table :chatmessages
  end
end
