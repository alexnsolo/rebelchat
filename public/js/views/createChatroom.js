(function() {
	RebelChat.Views.CreateChatroomView = Falcon.View.extend({
		url: 'createChatroom.html',
		observables: {
			'errorMessage': null,
			'chatroomName': null
		},
		submit: function() {
			var chatroomName = this.chatroomName();
			if (chatroomName && chatroomName.length > 0) {
				this.trigger('submit', {name: chatroomName});
			}
			else {
				this.errorMessage('Specify a name.');
			}
		}
	});
})();