
const colourRainArray=["#0077B6","#00B4D8","#90E0EF","#CAF0F8"]
let max=0


function handleChart() {

	console.log("chart start")


	Show('Loading',0)

	LoadC1()

	Show('WC1',1);
	Show('SEC1',1);

	LoadC2()

	Show('LC',1);
	Show('WC2',1);
	Show('SEC2',1);

	LoadC3()


	ODD.addEventListener("change",OnOSwitch2)
	MDD.addEventListener("change",OnSwitch3)
	SDD.addEventListener("change",OnSSwitch2)
	LDD.addEventListener("change",OnLSwitch2)
	WDD1.addEventListener("change",W1Switch)
	SEDD1.addEventListener("change",SE1Switch)
	console.log("chart end")
}
