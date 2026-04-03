let Chart1

let SEMINAR1,FROM1

function SeekSE1(R){if(SEMINAR1=="All"){return true}else if(R[COL1.Seminar]==SEMINAR1){return true}else{return false}}
function SeekW1(R){
	let D=R[COL1.DATE]
	if(SEMINAR1=="All"){return true}
	else {
		switch(SEMINAR1){
			case 1:
				if(D){}
				else{return false}
				break;
			case 2:
				if(D){}
				else{return false}
				break;
			case 3:
				if(D){}
				else{return false}
				break;
			case 4:
				if(D){}
				else{return false}
				break;
			case 5:
				if(D){}
				else{return false}
				break;
			case 6:
				if(D){}
				else{return false}
				break;
			case 7:
				if(D){}
				else{return false}
				break;
			case 8:
				if(D){}
				else{return false}
				break;
		}
	}
}

function OnChange(){
SEMINAR1=(Number(Or(document.getElementById('SEDD1').value,0))===0?"All":SeminarArray[Or(document.getElementById('SEDD1').value,0)-1]);
FROM1=(Number(Or(document.getElementById('WDD1').value,0))===0?"All":Or(document.getElementById('WDD1').value,0));


}

function SE1Switch(){

}

function W1Switch(){

}
//								CHART

function LoadC1(){
Chart1=  new Chart(
document.getElementById('Chart1HTML'),
{
type: 'bar',
options: {
animation: true,
scales:{y: {max: 1.2*(Math.max(...Object.values(C1Object)))}},
plugins: {
title:{display:true,text:"Leads by Location",font: {
size: 26, // Set the font size here
family: 'Arial', // Optional: you can also set other font properties
weight: 'bold', // Optional: e.g., 'normal', 'bold', etc.
},},
legend: {
display: false
},
tooltip: {
enabled: true
}
},
},
plugins:[topLabelsPluginK,chartTotalPlugin],
data: {
labels:Object.keys(C1Object),
datasets: [
{
data: Object.values(C1Object),
backgroundColor:colourRainArray
}
]
},

}
);

}