(function() {
	var updater;
	RebelChat.Views.ChatroomView = Falcon.View.extend({
		url: 'chatroom.html',
		defaults: {
			'chatroom': function(chatroom) { return chatroom; },
			'chatmessages': function(chatroom) { return new RebelChat.Collections.Chatmessages(chatroom); }
		},
		observables: {
			'newMessageContent': null,
			'focusOnInput': true
		},
		initialize: function(chatroom) {
			var _this = this;

			this.chatmessages.fetch();

			function scrollChatroomView() {
				$('.chatroom-view').animate({
						scrollTop: 100000000
				});
			}

			var lastCount;
			updater = setInterval(function(){
				_this.chatmessages.fetch();
 
				if (lastCount < _this.chatmessages.length()) {
					scrollChatroomView();
				}

				lastCount = _this.chatmessages.length();
			}, 1000);
		},
		goBack: function() {
			this.trigger('goBack');
			clearInterval(updater);
		},
		submitMessage: function() {
			var newChatmessage = {
				author: RebelChat.User.callsign,
				content: this.newMessageContent()
			};
			this.chatmessages.create(newChatmessage, {attributes: ["author", "content"]});
			this.newMessageContent('');
			this.focusOnInput(true);
		}
	});
})();