(function() {
	Falcon.baseTemplateUrl = "/templates";

	var LayoutView = Falcon.View.extend({
		url: 'layout.html',
		initialize: function() {}
	});

	Falcon.apply(new LayoutView());
})();