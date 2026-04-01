let Chart2

let SOURCE,OWNER,LOCATION

function RunFilters2(r){
const OUTPUT=SeekLocation(LOCATION,r)&&SeekSource(SOURCE,r)&&SeekOwner(OWNER,r);
return OUTPUT
}

function UpdateChart2(){
NEWDATA=rawData1.filter(r=>RunFilters2(r));
FilterAndReload2(NEWDATA,'assigned');}

function ReplaceData2(newData){Chart2.data.datasets[0].data=Object.values(newData);Chart2.data.labels=Object.keys(newData);max=Math.max(...Object.values(newData));UPDATE2();}

function NewTitle2(A){Chart2.options.plugins.title.text=A}

function UPDATE2(){Chart2.resize();Chart2.update()}

function SeekLocation(L,R){if(L=="All"){return true}else if(R[COL1.Location]==L){return true}else{return false}}
function SeekSource(S,R){if(S=="All"){return true}else if(R[COL1.source]==S){return true}else{return false}}
function SeekOwner(O,R){if(O=="All"){return true}else if(R[COL1.assigned]==O){return true}else{return false}}

function SetVariables2(){
SOURCE=(Number(Or(document.getElementById('SDD').value,0))===0?"All":SourceArray[Or(document.getElementById('SDD').value,0)-1]);
OWNER=(Number(Or(document.getElementById('ODD').value,0))===0?"All":OwnerArray[Or(document.getElementById('ODD').value,0)-1]);
LOCATION=(Number(Or(document.getElementById('LDD').value,0))===0?"All":LocationArray[Number(document.getElementById('LDD').value)-1]);
}

function FilterAndReload2(newdata,Variable){let NEWDATAOBJECT={};newdata.forEach(r=>{if(!(r[COL1[Variable]] in NEWDATAOBJECT)){NEWDATAOBJECT[r[COL1[Variable]]]=0};NEWDATAOBJECT[r[COL1[Variable]]]+=1})
ReplaceData2(NEWDATAOBJECT);}




let CHOICE=1,Memory

//								ONCLICK

function OnChartClick(INDEX,LABEL,VALUE){

	SetVariables2()
	const Choice=CHOICE
	Show('SC',1);
	CHOICE+=1;
	Show('Back',1);

	console.log(Choice,"->",CHOICE)

	if(Choice===1){
		document.getElementById('SDD').value=SourceArray.indexOf(LABEL)+1; 
		document.getElementById('ODD').value=0;
		SetVariables2()
		UpdateChart2();
		UPDATE2()
	}
	else if(Choice===2){
		document.getElementById('ODD').value=OwnerArray.indexOf(LABEL)+1;
		ReloadDetail();
		Show('DetailTable',1);
		Show('Chart2Div',0);
		Show('OC',1)
	}
}







//								SOURCE\LOCATION
function OnSSwitch2(){
SetVariables2()
UpdateChart2();
try{ReloadDetail();}catch(err){console.log(err)}
UPDATE2();}

function OnLSwitch2(){
SetVariables2()
if(CHOICE===1){
NEWDATA=rawData1.filter(r=>RunFilters2(r));
FilterAndReload2(NEWDATA,'source');}
else{UpdateChart2();}
try{ReloadDetail();}catch(err){console.log(err)}
UPDATE2();}

//								OWNER

function OnOSwitch2(){
SetVariables2()
SetVariables2()
try{ReloadDetail();}catch(err){console.log(err)}

}


//								BACK

function OnBack(){
Show('Back',0);
const Choice=CHOICE
CHOICE-=1
console.log(Choice,"->",CHOICE)
if(CHOICE!=1){Show('Back',1);Show('OC',0);Show('DetailTable',0);Show('Chart2Div',1);document.getElementById('ODD').value=0;}
else{document.getElementById('SDD').value=0;Show("SC",0);ReplaceData2(C2SetupObject)}
}


//								CHART




function LoadC2(){
 Chart2=  new Chart(
    document.getElementById('Chart2HTML'),
    {
      type: 'pie',
      options: {
	radius:'50%',
        animation: true,
        plugins: {
		title:{display:true,text:"Registrations by Source",font: {
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
	responsive: true,
                onClick: (e) => {
                    const activePoints = Chart2.getElementsAtEventForMode(e, 'nearest', {intersect: true}, false);
                    if (activePoints.length > 0) {
                        const index = activePoints[0].index;
                        const label = Chart2.data.labels[index];
                        const value = Chart2.data.datasets[0].data[index];
			OnChartClick(index,label,value)
                       
                    }
                }

      },
	plugins:[pieLabelsPlugin,chartTotalPlugin],
      data: {
        labels:Object.keys(C2SetupObject),
        datasets: [
          {
            data: Object.values(C2SetupObject),
		backgroundColor:colourRainArray
          }
        ]
      },

    }
  );

}