(function() {
	RebelChat = {
		Views: {},
		Models: {},
		Collections: {},
		User: {
			get callsign() {
				return sessionStorage.callsign;
			},
			set callsign(value) {
				sessionStorage.callsign = value;
			}
		}
	};
})();