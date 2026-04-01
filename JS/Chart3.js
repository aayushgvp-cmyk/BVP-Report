let Chart3

let MONTH

function RunFilters3(r){
const OUTPUT=SeekMonth(MONTH,r)
return OUTPUT
}

function UpdateChart3(){
	NEWDATA=rawData2.filter(r=>RunFilters3(r));
	FilterAndReload3(NEWDATA);
}


function ReplaceData3(newData){
	Chart3.data.datasets[0].data=Object.values(newData);
	Chart3.data.labels=Object.keys(newData);
	max=0;
	Object.values(newData).forEach(r=>r.value>max?max=r.value:max+=0);
	Chart3.options.scales.y.max=1.2*Math.max(...Object.values(newData));
	UPDATE3();
}

function NewTitle3(A){Chart3.options.plugins.title.text=A}

function UPDATE3(){Chart3.resize();Chart3.update()}

function SeekMonth(M,R){if(R[COL2.Month]==M){return true}else{return false}}

function SetMonth(){let M_0=document.getElementById('MDD').value-1;M_1=MArray[M_0];MONTH=M_1.slice(M_1.indexOf(" ")+1);}


function FilterAndReload3(newdata){let NEWDATAOBJECT={};newdata.forEach(r=>{if(!(r[COL2.Day] in NEWDATAOBJECT)){NEWDATAOBJECT[r[COL2.Day]]=0};NEWDATAOBJECT[r[COL2.Day]]+=Number(r[COL2.CPL])})
console.log(NEWDATAOBJECT)
ReplaceData3(NEWDATAOBJECT);}




//								MONTH
function OnSwitch3(){
SetMonth()
UpdateChart3();
}



//								CHART




function LoadC3(){
 Chart3=  new Chart(
    document.getElementById('Chart3HTML'),
    {
      type: 'line',
      options: {
        animation: true,
	scales:{y: {max: 1.2*(Math.max(...Object.values(C3SetupObject)))}},
        plugins: {
		title:{display:true,text:"Cost/Lead by day for April",font: {
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
	plugins:[topLabelsPluginK],
      data: {
        labels:Object.keys(C3SetupObject),
        datasets: [
          {
            data: Object.values(C3SetupObject),
		backgroundColor:colourRainArray
          }
        ]
      },

    }
  );

}