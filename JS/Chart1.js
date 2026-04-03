let Chart1

let SEMINAR1,FROM1

function SeekSE1(R){if(SEMINAR1=="All"){return true}else if(R[COL1.Seminar]==SEMINAR1){return true}else{return false}}
function SeekW1(R){
	let D=R[COL1.Date]
	const d=daysFrom(D)
	if(FROM1=="All"){return true}
	else {
		switch(FROM1){
			case 1:
				if(d===0){return true}
				else{return false}
				break;
			case 2:
				if(d===1){return true}
				else{return false}
				break;
			case 3:
				if(D){return true}
				else{return false}
				break;
			case 4:
				if(D){return true}
				else{return false}
				break;
			case 5:
				if(0<=d&&d<7){return true}
				else{return false}
				break;
			case 6:
				if(0<=d&&d<30){return true}
				else{return false}
				break;
			case 7:
				const D2=addMonth(100*Math.floor(DATE_TODAY_IN_yyyymmdd/100)+1)
				const D3=subtractMonth(D2)
				if(D2>D&&D>=D3){return true}
				else{return false} 
				break;
			case 8:
				const D0=100*Math.floor(DATE_TODAY_IN_yyyymmdd/100)+1
				const D1=subtractMonth(D0)
				if(D0>D&&D>=D1){return true}
				else{return false} 
				break;

		}
	}
}

function OnChange(){
SEMINAR1=(Number(Or(document.getElementById('SEDD1').value,0))===0?"All":SeminarArray[Or(document.getElementById('SEDD1').value,0)-1]);
FROM1=(Number(Or(document.getElementById('WDD1').value,0))===0?"All":parseInt(document.getElementById('WDD1').value));
const NEWDATA=rawData1.filter(r=>SeekSE1(r)&&SeekW1(r))
console.log(NEWDATA)
}

function SE1Switch(){
OnChange()
}

function W1Switch(){
OnChange()
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