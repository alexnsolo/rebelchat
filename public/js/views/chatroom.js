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
			'focusOnSmallInput': true,
			'focusOnLargeInput': false,
			'showLargeInput': false
		},
		initialize: function(chatroom) {
			var _this = this;

			function scrollChatroomView() {
				$('.chatroom-view').animate({
					scrollTop: $('.message-content:last').offset().top
				});
			}

			function handleRefreshError() {
				_this.goBack();
			}

			this.chatmessages.fetch().error(handleRefreshError);

			var lastCount;
			updater = setInterval(function(){
				_this.chatmessages.fetch().error(handleRefreshError);
 
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
			this.focusOnInput();
		},
		toggleLargeInput: function() {
			this.showLargeInput(!this.showLargeInput());
			this.focusOnInput();
		},
		focusOnInput: function() {
			if (this.showLargeInput()) {
				this.focusOnLargeInput(true);
			}
			else {
				this.focusOnSmallInput(true);
			}
		}
	});
})();