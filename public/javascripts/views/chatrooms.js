(function() {
	RebelChat.Views.ChatroomsView = Falcon.View.extend({
		url: 'chatrooms.html',
		defaults: {
			'callsign': RebelChat.User.callsign,
			'chatrooms': function() { return new RebelChat.Collections.Chatrooms(); }
		},
		observables: {
			'modalView': null
		},
		initialize: function() {
			this.chatrooms.fetch();
		},
		newChatroom: function() {
			var createChatroomModal = new RebelChat.Views.CreateChatroomView();
			createChatroomModal.on('submit', function(chatroomParams) {
				$('#chatroomModal').modal('hide');
				var chatroom = new RebelChat.Models.Chatroom(chatroomParams);
				chatroom.create({
					headers: {'HTTP_X_CSRF_TOKEN': RebelChat.User.CSRF_TOKEN}
				});
				this.chatrooms.fetch();
			});

			this.modalView(createChatroomModal);
			$('#chatroomModal').modal();
		}
	});
})();