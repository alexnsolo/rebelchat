Sequel.migration do
  up do
    create_table :chatmessages do
      primary_key :id
      foreign_key :chatroom_id, :chatrooms
      String :author
      Text :content
      DateTime :timestamp
    end
  end

  down do
    drop_table :chatmessages
  end
end
