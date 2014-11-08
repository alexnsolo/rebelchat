(function() {
	Falcon.baseTemplateUrl = "/templates";
	Falcon.adapter.config.dataTypeMap = {
		'DELETE': 'text'
	};

	Falcon.apply(new RebelChat.Views.LayoutView());
})();