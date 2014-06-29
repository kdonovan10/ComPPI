$(document).ready(function(){
	// tooltips
	$( document ).tooltip({
		position: {
			my: "left bottom-10px",
			at: "left top"
		},
		show: {delay: 250}
	});
	
	// first input autofokus
	//$("input[type='text']:eq(0)").focus();

	// striped tables
	$("table.striped_table tbody > tr:odd").addClass("striped_row");
	
	// highlighted list lines
	$(".hovered_list li, .hovered_list tr").hover(
		function() { $(this).addClass('hovered_listline'); },
		function() { $(this).removeClass('hovered_listline'); }
	);

	// DOWNLOADS
	$("input[name='fDlSet']").change(function() {
		switch(this.value) {
			case "comp":
			case "protnloc":
				$("#DLSpeciesContainer, #DLLocContainer").fadeIn();
				break;
			case "int":
				$("#DLLocContainer").fadeOut();
				// switch back to all localizations,
				// otherwise previously selected loc would be sent
				$("#DLLocContainer input:checked").removeAttr("checked");
				$("#fDlMLocAll").attr("checked", "checked");
				break;
			case "all":
			default:
				$("#DLSpeciesContainer, #DLLocContainer").fadeOut();
		}
		$("#DlSetHelpDisplay").html( $(this).next(".DlSetHelp").html() ).fadeIn();
	});
	$("input[name='fDlSet']:checked").change(); // trigger the event for first time
});

// PROTEIN SEARCH
$(function() {
	// search autocomplete
	$("#fProtSearchKeyword").autocomplete({
		source: function(request, response){
			// hardcoded URL for live environment: ugly, but it works..
			url = "/protein_search/autocomplete/" + request.term;
			$.getJSON(url, function(data){
				response(data);
			});
		},
		minLength: 2,
		select: function( event, ui ) {
			// submit?
		}
	});
	
	// show/hide advanced search
	if ($("#fProtSearchKeyword").length) {
		$("#fProtSearchContainerLL, #fProtSearchContainerLR").hide();
		
		// remove comment to enable multiline advanced search
		//orig_title = $("#fProtSearchKeyword").attr("title");
		//orig_height = $("#fProtSearchKeyword").height();
		//orig_height = orig_height.toString() + 'px';
		//textarea_title = $("#fProtSearchKeyword").attr("txttitle");
		
		$("#fProtSearchAdvancedBtn").click(function() {
			//var is_hidden = $("#fProtSearchContainerLL, #fProtSearchContainerLR").is(":hidden");
			$("#fProtSearchContainerLL, #fProtSearchContainerLR").slideToggle(300);
			
			// remove comment to enable multiline advanced search
			//if (is_hidden) {
			//	$("#fProtSearchKeyword")
			//		.animate({height:'110px'})
			//		.attr("title", textarea_title)
			//		.autocomplete( "option", "disabled", true );
			//} else {
			//	$("#fProtSearchKeyword")
			//		.animate({height:orig_height})
			//		.attr("title", orig_title)
			//		.autocomplete( "option", "disabled", false );
			//}
			
			return false;
		});
				
		// maintain user experience:
		// if textarea is in simple search mode (like an input field), then
		// submit when Enter key is pressed instead of inserting new line
		//$("#fProtSearchKeyword").on("keydown", function(event) {
		//	if (event.keyCode == 13 && $("#fProtSearchReset").is(":hidden")) {
		//		//window.alert('IGEN')
		//		$("#ProteinSearchForm").submit();
		//		return false;
		//	}
		//});
		
		// localization score treshold slider for protein search
		$("#fProtSearchLocScoreSlider").slider({
			min: 0,
			max: 100,
			range: "max",
			value: $("#fProtSearchLocScore").val(),
			slide: function( event, ui ) {
				$("#fProtSearchLocScore" ).val( ui.value );
			},
			change: function(event, ui) {
				//
			},
		});
		$("#fProtSearchLocScore").val( $("#fProtSearchLocScoreSlider").slider("value") );
		// slider should follow the typed in value
		$("#fProtSearchLocScore").on("keyup", function(event) {
			$("#fProtSearchLocScoreSlider").slider("value", $("#fProtSearchLocScore").val());
		});
		
		// reset the protein search form
		$("#fProtSearchReset").click(function() {
			$("#fProtSearchKeyword").val("");
			$("#fProtSearchLocScore").val(0);
			$("#fProtSearchLocScoreSlider").slider("value", 0);
			$("#ProteinSearchForm input:checkbox").attr("checked", "checked");
		});
	}
	
	// show/hide protein interaction details
	$(".ps-actorBDetails").hide();
	$(".ps-detailsOpener").click(function() {
		$(this).siblings(".ps-actorBDetails:first").slideToggle();
		return false;
	});
});