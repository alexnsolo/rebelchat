(function() {
	Falcon.baseTemplateUrl = "/templates";
	Falcon.apply(new RebelChat.Views.LayoutView());
	
	$.ajax({
        type: 'GET', url: '/csrf_token',
        async: false,
        cache: false,
        success: function (data, textStatus, jqXHR) {
            RebelChat.User.CSRF_TOKEN = data.csrf;
        }
    });
})();