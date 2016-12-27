(function($){
	var selId;
	var currentSearch;
	
	function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
	
	function searchFilter(s){
		return s.toLowerCase().indexOf(currentSearch.toLowerCase()) >= 0;
	}
	
	function addOps(ops){
		$("[data-selector-id=" + selId + "] .betterselecter-content").empty();
		
		for(var i = 0; i < ops.length; i++){
			$("[data-selector-id=" + selId + "] .betterselecter-content").append("<div class='betterselecter-op' data-selector-value='"+ ops[i] +"'>"+ ops[i] +"</div>");
		}
		$("[data-selector-id=" + selId + "] .betterselecter-op").first().addClass("bs-selected");
		
		$("[data-selector-id=" + selId + "] .betterselecter-op").click(function(){
			$("[data-selector-id=" + selId + "] .bs-selected").removeClass("bs-selected");
			$(this).addClass("bs-selected");
			$("[data-selector-id=" + selId + "] input").val($(this).attr("data-selector-value"));
			
			$("[data-selector-id=" + selId + "] .betterselecter-content").slideUp();
		});
	}
	
	$.fn.betterSelect = function(){
		var ops = [];
		
		this.find("option").each(function(e){
			ops.push($(this).html());
		});
		
		selId = guid();
		
		this.replaceWith("<div class='betterselecter clearfix' data-selector-id='"+ selId +"'><input type='text' name='"+ this.attr("name") +"' value='"+ ops[0] +"'/><div class='betterselecter-content' style='display:none'></div><div class='betterselecter-footer clearfix'><div style='float:right'>Powered by <a href='//arctro.com'>Arctro</a></div></div></div></div>")
		
		$("[data-selector-id=" + selId + "] input").click(function(){
			addOps(ops);
			$(this).select();
			$("[data-selector-id=" + selId + "] .betterselecter-content").slideDown();		
		});
		
		$(document).click(function(event) { 
		    if(!$(event.target).closest("[data-selector-id=" + selId + "]").length) {
		        if($("[data-selector-id=" + selId + "] .betterselecter-content").is(":visible")) {
		            $("[data-selector-id=" + selId + "] .betterselecter-content").slideUp();
		        }
		    }        
		});
		
		$("[data-selector-id=" + selId + "] input").on("change keyup paste", function(){
			currentSearch = $(this).val();
			addOps(ops.filter(searchFilter));
		})
		
		return this;
	};
})(jQuery);