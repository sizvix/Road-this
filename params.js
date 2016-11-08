function getUrlMap(adr){
	return 'https://www.bing.com/mapspreview?where='+adr ;
}

function getUrliRoad(adr){
	return 'https://www.bing.com/mapspreview?rtp=adr.'+window.localStorage['mp_ici']+'~adr.'+ adr ;
}

function affAdr(num){
	if(window.localStorage['mp_'+num]==undefined) return ;
	var info = window.localStorage['mp_'+num].split('>');
	var inp = document.createElement('input');
	if(info[0]!='') inp.value = info[0] ;
	else inp.value = 'Titre' ;
	inp.onchange = function(){ 
		window.localStorage['mp_'+num] = inp.value + window.localStorage['mp_'+num].slice(window.localStorage['mp_'+num].indexOf('>'));
	};
	var li = document.createElement('li');
	li.appendChild(inp);
	lst_points.appendChild(li);
	li.insertAdjacentHTML('beforeend',' <a href="'+info[3]+'" target="_blank">'+chrome.i18n.getMessage("org_pg")+'</a> <a href="'+getUrlMap(info[1])+'" target="_blank">'+chrome.i18n.getMessage("mapThis")+'</a> <a href="'+getUrliRoad(info[1])+'" target="_blank">'+chrome.i18n.getMessage("thisRoad")+'</a> ');
	var suppr = document.createElement('span');
	suppr.style = "font-weight:bold;color:red" ;
	suppr.textContent = 'X' ;
	li.appendChild(suppr);
	suppr.onclick = function(){
		delete window.localStorage['mp_'+num] ;
		lst_points.removeChild(li);
	};
}

if(window.localStorage['mp_ici']!=undefined)
	ici.value = window.localStorage['mp_ici'];
if(window.localStorage['mp_nb_p']!=undefined){
	var nb = window.localStorage['mp_nb_p'];
	for(var i=0; i<=nb ;i++)
		affAdr(i);
}
param_title.innerHTML = chrome.i18n.getMessage("params");
adr_lst_title.innerHTML = chrome.i18n.getMessage("address");

ici.onchange = function(){
	window.localStorage['mp_ici'] = ici.value ;
};
