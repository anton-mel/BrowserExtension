
    // Item For Click Menu
    let contextMenuItem = {
        "id" : "searchbot",
        "title" : "Search Brand",
        "contexts" : ["selection"]
    }
	chrome.contextMenus.create(contextMenuItem);

    // Click Event
    chrome.contextMenus.onClicked.addListener(function(webdata, tab){
        let brandname = webdata.selectionText.charAt(0).toUpperCase() + webdata.selectionText.slice(1).toLowerCase();
        let count = 0;

        $.map( data, function( val, i ) {
            let brand = val['name'].toLowerCase();
            let message;

            // notification
            if(brand == webdata.selectionText.toLowerCase()){
                count++;

                if(val['cruelty-free'] == 'так' || val['cruelty-free'] == 'yes'){
                    message = "It is cruelty-free!";
                }else{
                    message = "This brand tests on animals!";
                }

                if(val['vegan'] == 'так' || val['vegan'] == 'yes'){
                    message += " They are also vegan!";
                }

                chrome.notifications.create('search', {
                    type: 'basic',
                    iconUrl: 'https://esmu.ga/turbota/LOGODATA/'+val['photo'],
                    title: 'We found ' + brandname + ' Brand!',
                    message: message,
                    priority: 2
                });
            }
        }); 
        
        if(count == 0){
            // FAIL
            chrome.notifications.create('fail', {
                type: 'basic',
                iconUrl: '/svg/fail.png',
                title: 'No brand were found!',
                message: 'Send this brand to us for an overview!',
                priority: 3
            });
        }
    });