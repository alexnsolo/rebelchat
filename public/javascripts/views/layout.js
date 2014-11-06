(function() {
	RebelChat.Views.LayoutView = Falcon.View.extend({
		url: 'layout.html',
		observables: {
			'currentView': null
		},
		initialize: function() {
			var self = this;
			var chatroomsView = new RebelChat.Views.ChatroomsView();
			var callsignView = new RebelChat.Views.CallsignView();
			var homeView = new RebelChat.Views.HomeView();
			
			callsignView.on('callsignChosen', function() {
				self.currentView(chatroomsView);
			});

			homeView.on('getStarted', function() {
				self.currentView(callsignView);
			});

			if (RebelChat.User.callsign) {
				this.currentView(chatroomsView);
			}
			else {
				this.currentView(homeView);
			}
		}
	});
})();