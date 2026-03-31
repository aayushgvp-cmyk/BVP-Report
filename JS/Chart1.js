let Chart1
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
		title:{display:true,text:"Leads by Location"},
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