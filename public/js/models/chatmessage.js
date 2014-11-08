(function() {
	RebelChat.Models.Chatmessage = Falcon.Model.extend({
		url: "chatmessage",
		observables: {
			'author': '',
			'content': '',
			'timestamp': null
		},
		defaults: {
			'timeago': function(instance) {
				return moment(instance.timestamp).fromNow();
			},
			'contentParsed': function(instance) {
				return markdown.toHTML(instance.content);
			}
		}
	});

	RebelChat.Collections.Chatmessages = Falcon.Collection.extend({
		model: RebelChat.Models.Chatmessage
	})
})();