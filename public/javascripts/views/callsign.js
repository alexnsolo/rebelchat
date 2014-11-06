(function() {
	RebelChat.Views.CallsignView = Falcon.View.extend({
		url: 'callsign.html',
		observables: {
			'callsign': null,
			'errorMessage': null
		},
		submit: function() {
			var callsign = this.callsign();
			if (callsign && callsign.length > 0) {
				RebelChat.User.callsign = callsign
				this.trigger('callsignChosen');
			}
			else {
				this.errorMessage('Nice try, wise guy.');
			}
		}
	});
})();