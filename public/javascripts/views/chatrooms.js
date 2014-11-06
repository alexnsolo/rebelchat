(function() {
	RebelChat.Views.ChatroomsView = Falcon.View.extend({
		url: 'chatrooms.html',
		defaults: {
			'callsign': function() { return RebelChat.User.callsign; },
			'chatrooms': function() { return new RebelChat.Collections.Chatrooms(); }
		},
		observables: {
			'modalView': null
		},
		initialize: function() {
			this.chatrooms.fetch();
		},
		newChatroom: function() {
			var self = this;
			var createChatroomModal = new RebelChat.Views.CreateChatroomView();
			createChatroomModal.on('submit', function(chatroomParams) {
				$('#chatroomModal').modal('hide');
				var chatroom = new RebelChat.Models.Chatroom(chatroomParams);
				chatroom.create().done(function() {
					self.chatrooms.fetch();
					console.log('bam!');
				});
			});

			this.modalView(createChatroomModal);
			$('#chatroomModal').modal();
		}
	});
})();