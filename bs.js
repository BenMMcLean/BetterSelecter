(function($){
	var searchParent;
	var selectParent;
	var search;
	
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
		$content = searchParent.find(".betterselecter-content");
		$content.empty();
		
		for(var i = 0; i < ops.length; i++){
			$content.append("<div class='betterselecter-op' data-selector-name='"+ ops[i].name +"' data-selector-value='"+ ops[i].value +"'>"+ ops[i].name +"</div>");
		}
		
		searchParent.find(".betterselecter-op").click(function(){
			searchParent.find(".betterselecter-value").val($(this).attr("data-selector-value"));
			selectParent.find(".bss-c").html($(this).attr("data-selector-name"));
			searchParent.hide();
		});
	}
	
	$.fn.betterSelect = function(){
		var ops = [];
		
		this.find("option").each(function(e){
			ops.push(new op($(this).html(), $(this).val()));
		});
		
		var selId = guid();
		
		this.replaceWith("<div class='betterselecter-sel' data-selid-i='"+ selId +"'><div class='betterselcter-ch'></div><span class='bss-c'>"+ ops[0].name +"<span></div><div class='betterselecter clearfix' data-selid-s='"+ selId +"' style='display:none'><input data-input type='text'/><input class='betterselecter-value' type='hidden' name='"+ this.attr("name") +"' value='"+ ops[0].value +"'/><div class='betterselecter-content'></div><div class='betterselecter-footer clearfix'><div style='float:right'>Powered by <a href='//arctro.com'>Arctro</a></div></div></div></div>")
		
		searchParent = $("[data-selid-s="+ selId +"]");
		selectParent = $("[data-selid-i="+ selId +"]");
		addOps(ops);
		

		
		selectParent.click(function(){
			searchParent.css("top", selectParent.position().top + "px").show();
			addOps(ops);
			searchParent.find("[data-input]").focus().val("");
		});
		
		$(document).click(function(event) { 
		    if(!$(event.target).closest(searchParent.selector).length && !$(event.target).closest(selectParent.selector).length) {
		        if(searchParent.is(":visible")) {
		        	searchParent.hide();
		        }
		    }        
		});
		
		searchParent.find("[data-input]").on("change keyup paste", function(){
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