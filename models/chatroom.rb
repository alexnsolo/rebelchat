class Chatroom < Sequel::Model
	String :name
	
	plugin :json_serializer
end
