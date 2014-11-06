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
			var createChatroomModal = new RebelChat.Views.CreateChatroomView();
			createChatroomModal.on('submit', function(chatroomParams) {
				$('#chatroomModal').modal('hide');
				this.chatrooms.create(chatroomParams, {attributes: ["name"]});
			}, this);

			this.modalView(createChatroomModal);
			$('#chatroomModal').modal();
		},
		deleteChatroom: function(chatroom) {
			if (confirm("Are you sure?") !== true) return;
			console.log(chatroom);
			this.chatrooms.destroy(chatroom);
		}
	});
})();