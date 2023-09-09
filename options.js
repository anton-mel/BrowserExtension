

$(".close").click(function(){
	close();
});



//range
chrome.storage.sync.get('perc', function(val){
	if(val.perc){
		$('#valBox').html( val.perc+"%" );
		$("#slider").val(val.perc);
	}else{
		chrome.storage.sync.set({'perc': 65});
		$('#valBox').html( "65%" );
	}
});



//settings
chrome.storage.sync.get('notc', function(val){
	if(val.notc==true||val.notc==false){
		if(val.notc==false){
			$(".s1 input").prop('checked',false);
		}else{
			$(".s1 input").prop('checked',true);
		}
	}else{
		chrome.storage.sync.set({'notc': true});
	}
});

chrome.storage.sync.get('menuc', function(val){
	if(val.menuc==true||val.menuc==false){
		if(val.menuc==false){
			$(".s2 input").prop('checked',false);
		}else{
			$(".s2 input").prop('checked',true);
		}
	}else{
		chrome.storage.sync.set({'menuc': true});
	}
});

chrome.storage.sync.get('uac', function(val){
	if(val.uac==true||val.uac==false){
		if(val.uac==false){
			$(".s3 input").prop('checked',false);
		}else{
			$(".s3 input").prop('checked',true);
		}
	}else{
		chrome.storage.sync.set({'uac': false});
	}
});


$(document).on('input', '#slider', function() {
    $('#valBox').html( $(this).val()+"%" );
    chrome.storage.sync.set({'perc': $(this).val()});
});


$("#generate").click(function(){
	$('#valBox').html( "65%" );
	chrome.storage.sync.set({'perc': 65});
	$("#slider").val(65);
	chrome.storage.sync.set({'notc': true});
	chrome.storage.sync.set({'menuc': true});
	chrome.storage.sync.set({'uac': false});

	if(!$(".s1 input").prop( "checked" )){
		$(".s1 input").prop('checked',true);
	}

	if(!$(".s2 input").prop( "checked" )){
		$(".s2 input").prop('checked',true);
	}

	if($(".s3 input").prop( "checked" )){
		$(".s3 input").prop('checked',false);
	}
});

$(".s1 label").click(function(){
	if($(".s1 input").prop('checked')){
		chrome.storage.sync.set({'notc': false});
	}else{
		chrome.storage.sync.set({'notc': true});
	}
});

$(".s2 label").click(function(){
	if($(".s2 input").prop('checked')){
		chrome.storage.sync.set({'menuc': false});
	}else{
		chrome.storage.sync.set({'menuc': true});
	}
});

$(".s3 label").click(function(){
	if($(".s3 input").prop('checked')){
		chrome.storage.sync.set({'uac': false});
	}else{
		chrome.storage.sync.set({'uac': true});
	}
});