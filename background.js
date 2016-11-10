/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated(n) {
  if (chrome.runtime.lastError) {
    console.log("error creating item:" + chrome.runtime.lastError);
  } else {
    console.log("item created successfully");
  }
}

/*
Called when the item has been removed, or when there was an error.
We'll just log success or failure here.
*/
function onRemoved() {
  if (chrome.runtime.lastError) {
    console.log("error removing item:" + chrome.runtime.lastError);
  } else {
    console.log("item removed successfully");
  }
}

/*
Create all the context menu items.
*/
chrome.contextMenus.create({
  id: "map_trip",
  title: chrome.i18n.getMessage("mapThis"),
  contexts: ["selection"]
}, onCreated);

chrome.contextMenus.create({
  id: "road_trip",
  title: chrome.i18n.getMessage("thisRoad"),
  contexts: ["selection"]
}, onCreated);

chrome.contextMenus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["all"]
}, onCreated);

chrome.contextMenus.create({
  id: "params",
  title: chrome.i18n.getMessage("params")
}, onCreated);


function addPoint(adr,tab){
//	window.localStorage.clear();
	var nb = window.localStorage['mp_nb_p']!=undefined ? parseInt(window.localStorage['mp_nb_p'])+1 : 0;
	var i = 0 ;
	for(; i<nb ;i++)					// search to fill the first empty place
		if(window.localStorage['mp_'+i]==undefined)
			break ;
	if( i==nb ) window.localStorage['mp_nb_p'] = nb ;	// if i==nb , there is no empty place, so we add one 
	window.localStorage['mp_'+i] = tab.title+'>'+adr+'>'+(new Date()).getTime()+'>'+tab.url ;
}


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "map_trip" :
      chrome.tabs.create({
        "url": 'https://www.bing.com/mapspreview?where='+info.selectionText
      });
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log(tabs);
		addPoint(info.selectionText,tabs[0]);
	});
      break;
    case "params" :
	chrome.tabs.create({"url": chrome.extension.getURL("params.html")});
      break;
    case "road_trip" :
      chrome.tabs.create({
	"url": 'https://www.bing.com/mapspreview?rtp=adr.'+window.localStorage['mp_ici']+'~adr.'+ info.selectionText
      });
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		addPoint(info.selectionText,tabs[0]);
	});
/*/	chrome.tabs.executeScript(null,{ code: "navigator.geolocation.getCurrentPosition(function(pos){ alert(pos.coords.latitude+'_'+pos.coords.longitude) });", matchAboutBlank: true })
	chrome.tabs.create({
		"url": 'http://www.silpaop.com'
	}).then(function(tab){
	chrome.tabs.executeScript(tab.id,{ code: "window.addEventListener('load', function(){alert('ploppp') },false);" })
//	chrome.tabs.executeScript(null,{ code: "window.addEventListener('load', function(){navigator.geolocation.getCurrentPosition(function(pos){ alert(pos.coords.latitude+'_'+pos.coords.longitude) }); });", matchAboutBlank: true })
/*		chrome.tabs.sendMessage(
			tab.id,
			{greeting: "hi from background script"},
			handleResponse
		);	* /
	});
	var pos = { latitude:'45.1',longitude:'1.1'};
/*      alert('https://www.bing.com/mapspreview?rtp=pos.'+pos.latitude+'_'+pos.longitude+'~'+ info.selectionText);
//      navigator.geolocation.getCurrentPosition(function(pos){
	      chrome.tabs.create({
		"url": 'https://www.bing.com/mapspreview?rtp=pos.'+pos.latitude+'_'+pos.longitude+'~'+ info.selectionText
	      });		* /
//      }); */
      break;
  }
});
