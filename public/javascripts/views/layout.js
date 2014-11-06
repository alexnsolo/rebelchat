(function() {
	RebelChat.Views.LayoutView = Falcon.View.extend({
		url: 'layout.html',
		observables: {
			'currentView': null
		},
		initialize: function() {
			var self = this;
	
			this.showChatroomView = function() {
				var chatroomsView = new RebelChat.Views.ChatroomsView();
				this.currentView(chatroomsView);
			}

			this.showCallsignView = function() {
				var callsignView = new RebelChat.Views.CallsignView();
				callsignView.on('callsignChosen', this.showChatroomView, this);
				this.currentView(callsignView);
			}

			this.showHomeView = function() {
				var homeView = new RebelChat.Views.HomeView();
				homeView.on('getStarted', this.showCallsignView, this);
				this.currentView(homeView);
			}

			if (RebelChat.User.callsign) {
				this.showChatroomView();
			}
			else {
				this.showHomeView();
			}
		}
	});
})();