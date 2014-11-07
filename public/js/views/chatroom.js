(function() {
	RebelChat.Views.ChatroomView = Falcon.View.extend({
		url: 'chatroom.html',
		defaults: {
			'chatroom': function( chatroom ){ return chatroom; }
		},
		goBack: function() {
			this.trigger('goBack');
		}
	});
})();