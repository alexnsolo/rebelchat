class Chatmessage < Sequel::Model
  one_to_one :chatroom
  
  plugin :json_serializer
end
