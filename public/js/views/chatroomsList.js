(function() {
	RebelChat.Views.ChatroomsListView = Falcon.View.extend({
		url: 'chatroomsList.html',
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
			this.chatrooms.destroy(chatroom);
		},
		joinChatroom: function(chatroom) {
			this.trigger('joinChatroom', chatroom);
		}
	});
})();