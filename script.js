// Anton Melnychuk

jQuery(document).ready(function($){
	// Function to handle hover behavior
	$(".hoveratext").hover(function(){
		// Mouseover actions
		$(this).find("h6").css("left","10px");
		$(this).show();
		$(this).find("h6").css("display","flex");
		$(this).find(".inh6").css("display","flex");
		
		$(this).find("h6").animate({
			left: "-10",
			opacity: ".95"
		},100);
		$(this).find(".inh6").animate({
			opacity: ".5"
		},100);
	},
	function(){
		// Mouseout actions
		$(this).find("h6").animate({
			left: "10",
			opacity: "0"
		},100, function(){
			$(this).find("h6").css("display","none");
			$(this).hide();
		});
		$(this).find(".inh6").animate({
			opacity: "0"
		},100, function(){
			$(this).find("h6").css("display","none");
			$(this).hide();
		});
	});

	$imenu = 0;

	// Toggle menu visibility
	$(".hide").click(function(){
		if($imenu == 0){
			$(this).addClass("hide2");
			$(".menu").hide();
			$(".panel-footer").css("width","350px");
			$(".all").css("width","330px");
			$imenu++;
		}else{
			$(this).removeClass("hide2");
			$(".menu").show();
			$(".panel-footer").css("width","300px");
			$(".all").css("width","280px");
			$imenu--;
		}
	});

	// Function to set text in English
	function eng(){
		// Set English text for various elements
		$(".blsearch input").attr("placeholder", "Brand name...");
		$(".vegan").text("#vegan");
		$(".cr").text("#cruelty-free");
		$(".val p").text("Environmental Extension © 2023");
		$(".val span").text("Telegram Bot");
		$(".logoname").text("ESMU");
		$(".h6c2").text("UA language");
		$(".h6c3").text("ENG language");
		$(".h6c4").text("Our website");
		$(".h6c5").text("Add new brand");
		$(".h6c6").text("Search Options");
		$(".h6c7").text("Support");
	}

	// Function to set text in Ukrainian
	function ua(){
		// Set Ukrainian text for various elements
		$(".blsearch input").attr("placeholder", "Назва бренду...");
		$(".vegan").text("#веган");
		$(".cr").text("#без-жорстокості");
		$(".val p").text("Екологічний Плагін © 2023");
		$(".val span").text("Телеграм Бот");
		$(".logoname").text("ЕСМУ");
		$(".h6c2").text("українська мова");
		$(".h6c3").text("англійська мова");
		$(".h6c4").text("Наш вебсайт");
		$(".h6c5").text("Додати бренд");
		$(".h6c6").text("Пошукові налаштування");
		$(".h6c7").text("Підтримка");
	}

	// Function to check the language setting and set text accordingly
	function langcheck(){
		chrome.storage.sync.get('lang', function(api){
			if(api.lang == 'en'){
				eng();
			}else if(api.lang == 'ua'){
				ua();
			}else{
				chrome.storage.sync.set({'lang': 'en'});
				eng();
			}
		});
	}

	// Function to check the switch setting and set its state
	function switchcheck(){
		chrome.storage.sync.get('check', function(brands){
			if(brands.check == true){
				$('#switch').prop( "checked", true );
			}else if(brands.check == true){
				$('#switch').prop( "checked", false );
			}else{
				chrome.storage.sync.set({'check': false});
			}
		});
	}

	// Function to reload the page
	function reloadpag(){
		$('.panel-footer').remove();
		$('.all').paginathing({
			perPage: 4,
			containerClass: 'panel-footer'
		});
	}

	// Event listener for changing to Ukrainian language
	$('.u').click(function(){
		chrome.storage.sync.set({'lang': 'ua'});
		ua();
	});

	// Event listener for changing to English language
	$('.e').click(function(){
		chrome.storage.sync.set({'lang': 'en'});
		eng();
	});

	// Initialize switch based on stored setting
	chrome.storage.sync.get('check', function(brands){
		if(brands.check==true||brands.check==false){
			if(brands.check==true){
				$(".inh6 span").html("ON");
			}else{
				$(".inh6 span").html("OFF");
			}
		}else{
			chrome.storage.sync.set({'check': false});
			$(".inh6 span").html("OFF");
		}
	});

	// Event listener for the switch toggle
	$('#switch + label').click(function(){
		chrome.storage.sync.get('check', function(brands){
			if(brands.check == false){
				chrome.storage.sync.set({'check': true});
				
				chrome.storage.sync.get('lang', function(api){
					if(api.lang == 'en'){
						$messagex = 'You\'ve activated auto search in your browser! Reload your page, please!';
						$titlex = 'Congratulations!';
						// Create a notification
						var notifOptions = {
							type: 'basic',
							iconUrl: 'icon.png',
							title: $titlex,
							message: $messagex
						};
						chrome.notifications.create('limitNotif', notifOptions);
					}else if(api.lang == 'ua'){
						$messagex = 'Ви активували автоматичний пошук! Перезавантажте сторінку, будь ласка!';
						$titlex = 'ВІТАЮ!';
						// Create a notification
						var notifOptions = {
							type: 'basic',
							iconUrl: 'icon.png',
							title: $titlex,
							message: $messagex
						};
						chrome.notifications.create('limitNotif', notifOptions);
						}else{
						$messagex = 'You\'ve activated auto search in your browser! Reload your page, please!';
						$titlex = 'Congratulations!';
						// Create a notification
						var notifOptions = {
							type: 'basic',
							iconUrl: 'icon.png',
							title: $titlex,
							message: $messagex
						};
						chrome.notifications.create('limitNotif', notifOptions);
					}
				});
				
				$(".inh6 span").html("ON");
			}else{
				chrome.storage.sync.set({'check': false});
				$(".inh6 span").html("OFF");
			}    
		});
	});

	function addbrands(){
		$(".all").empty();

		for(let q = 0; q<data.length; q++){

			let brand__block = '',
			veg__class = '',
			cur__class = 'yellow',
			photo = '';

			if(data[q]['vegan']=="так"){
				veg__class = "greenc";

				if(data[q]['cruelty-free']=="так"){
					cur__class = "greenc";
				}else{
					cur__class = "redc";
					veg__class = "redc";
				}

				if(data[q]['photo']!==undefined){
					photo = 'LOGODATA/'+data[q]['photo'];
				}

				brand__block = '<a class="brand '+veg__class+cur__class+'" ><img class="logo" src="'+photo+'"></img><div class="contb"><h1>'+data[q]['name']+'</h1><div class="desc"><div class="vegan '+veg__class+'"></div><div class="cr '+cur__class+'"></div></div></div></a>';
			}else{
				veg__class = 'redc';

				if(data[q]['cruelty-free']=="так"){
					cur__class = "greenc";
				}else{
					cur__class = "redc";
					veg__class = "redc";
				}

				if(data[q]['photo']!==undefined){
					photo = 'LOGODATA/'+data[q]['photo'];
				}

				brand__block = '<a class="brand '+veg__class+cur__class+'" ><img class="logo" src="'+photo+'"></img><div class="contb"><h1>'+data[q]['name']+'</h1><div class="desc"><div class="cr '+cur__class+'"></div></div></div></a>';
			}

			$(".all").append(brand__block);
		}

		switchcheck();
		langcheck();
		reloadpag();
	}

	$('.brandlasth').click(function(){ 
		addbrands();
	});

	// Function to calculate similarity between two strings
	function similarity(s1, s2) {
		var longer = s1;
		var shorter = s2;
		if (s1.length < s2.length) {
			longer = s2;
			shorter = s1;
		}
		var longerLength = longer.length;
		if (longerLength === 0) {
			return 1.0;
		}
		return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
	}

	// Function to calculate edit distance between two strings
	function editDistance(s1, s2) {
		s1 = s1.toLowerCase();
		s2 = s2.toLowerCase();

		var costs = new Array();
			for (var i = 0; i <= s1.length; i++) {
				var lastValue = i;
				for (var j = 0; j <= s2.length; j++) {
					if (i == 0)
						costs[j] = j;
					else {
						if (j > 0) {
							var newValue = costs[j - 1];
							if (s1.charAt(i - 1) != s2.charAt(j - 1))
								newValue = Math.min(Math.min(newValue, lastValue),
								costs[j]) + 1;
							costs[j - 1] = lastValue;
							lastValue = newValue;
						}
					}
				}
				if (i > 0)
					costs[s2.length] = lastValue;
			}
		return costs[s2.length];
	}

	let $nr = 0;

	// Function to handle brand filtering and display
	function filterAndDisplayBrands(searchText) {
		$brands = 0;
		$alldiv = '';

		$.map(data, function (val, i) {
		const $str1 = val['name'].toLowerCase();
		const $str2 = searchText.toLowerCase();

		const perc = Math.round(similarity($str1, $str2) * 10000) / 100;

		const normalperc = 50;

		if (perc > normalperc) {
			$brands++;

			veg__class = 'yellow';
			cur__class = 'yellow';

			if (val['vegan'] == 'так') {
				veg__class = 'greenc';
			} else if (val['vegan'] == 'ні') {
				veg__class = 'redc';
			} else {
				veg__class = 'yellow';
			}

			if (val['cruelty-free'] == 'так') {
				cur__class = 'greenc';
			} else {
				cur__class = 'redc';
			}

			if (val['photo'] !== undefined) {
				photo = 'LOGODATA/' + val['photo'];
			}

			$alldiv += '<a class="brand ' + veg__class + cur__class + '" ><img class="logo" src="' + photo + '"></img><div class="contb"><h1>' + val["name"] + '</h1><div class="desc"><div class="vegan ' + veg__class + '"></div><div class="cr ' + cur__class + '"></div></div></div></a>';

			$contrepeat = $brands;
		}
		});

		if (searchText && $brands == 0) {
			// Display a message if no brands match the search and there is input
			$(".all").html("This brand does not exist in our database.");
		} else {
			if ($nr !== $brands) {
				$(".all").empty();
				$(".all").append($alldiv);
				langcheck();
			}
		}

		$nr = $brands;
	}

	// Event listener for search input changes
	$(".blsearch input").on('input', function () {
		const searchText = $(this).val();
		filterAndDisplayBrands(searchText);
	});

	$(".blsearch input").on('keyup', function () {
		if ($(this).val() === "") {
		  // If the input is empty, show all brands again
		  addbrands();
		}
	});

	addbrands();
});
