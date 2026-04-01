//Hides or shows a segment
function Show(a,b){
	if (b){
		document.getElementById(a).classList.remove('hidden');
	}
	else {
		document.getElementById(a).classList.add('hidden');
	}
	
}

//Shorthand for console.log
function log(...a){
	console.log(...a)
}