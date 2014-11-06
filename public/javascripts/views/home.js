(function() {
	RebelChat.Views.HomeView = Falcon.View.extend({
		url: 'home.html',
		getStarted: function() {
			this.trigger('getStarted');
		}
	});
})();