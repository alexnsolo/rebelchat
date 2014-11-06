(function() {
	RebelChat.Models.Chatroom = Falcon.Model.extend({
		url: "chatroom",
		observables: {
			'name': ''
		}
	});

	RebelChat.Collections.Chatrooms = Falcon.Collection.extend({
		model: RebelChat.Models.Chatroom
	})
})();