(function($){
	var selId;
	var currentSearch;

	function dsi(){
		return "[data-selector-id=" + selId + "]";
	}

	function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	function searchFilter(s){
		return s.name.toLowerCase().indexOf(currentSearch.toLowerCase()) >= 0;
	}

	function addOps(ops){
		$(dsi() + " .betterselecter-content").empty();

		for(var i = 0; i < ops.length; i++){
			$(dsi() + " .betterselecter-content").append("<div class='betterselecter-op' data-selector-name='"+ ops[i].name +"' data-selector-value='"+ ops[i].value +"'>"+ ops[i].name +"</div>");
		}

		$(dsi() + " .betterselecter-op").click(function(){
			$(dsi() + " .bs-selected").removeClass("bs-selected");
			$(this).addClass("bs-selected");
			$(dsi() + " [data-input]").val($(this).attr("data-selector-name"));
			$(dsi() + " [data-val]").val($(this).attr("data-selector-value"));

			$(dsi() + " .betterselecter-content").slideUp();
		});
	}

	$.fn.betterSelect = function(){
		var ops = [];

		this.find("option").each(function(e){
			ops.push(new op($(this).html(), $(this).val()));
		});

		selId = guid();

		this.replaceWith("<div class='betterselecter clearfix' data-selector-id='"+ selId +"'><input data-input type='text' value='"+ ops[0].name +"'/><input data-val type='hidden' name='"+ this.attr("name") +"' value='"+ ops[0].value +"'/><div class='betterselecter-content' style='display:none'></div><div class='betterselecter-footer clearfix'><div style='float:right'>Powered by <a href='//arctro.com'>Arctro</a></div></div></div></div>")

		$(dsi() + " [data-input]").click(function(){
			addOps(ops);
			$(this).select();
			$(dsi() + " .betterselecter-content").slideDown();
		});

		$(document).click(function(event) {
		    if(!$(event.target).closest(dsi() + "").length) {
		        if($(dsi() + " .betterselecter-content").is(":visible")) {
		            $(dsi() + " .betterselecter-content").slideUp();
		        }
		    }
		});

		$(dsi() + " [data-input]").on("change keyup paste", function(){
			currentSearch = $(this).val();
			addOps(ops.filter(searchFilter));
		})

		return this;
	};

	function op(name, value){
		if(typeof value === "undefined"){
			this.value = name;
		}else{
			this.value = value;
		}
		this.name = name;
	}
})(jQuery);
