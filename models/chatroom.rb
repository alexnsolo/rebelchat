class Chatroom < Sequel::Model
	one_to_many :chatmessages
	
	plugin :json_serializer
end
