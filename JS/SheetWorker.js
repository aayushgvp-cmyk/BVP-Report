
let C1Object={},C2SetupObject={},C3SetupObject={}
let rawData1,rawData2,rawData3
let SourceArray=[],OwnerArray=[],LocationArray=[]
async function handleFileAsync() {

console.time("Data imported and processed in")



//											  C1

rawData1=await ImportData("Leads")


rawData1.forEach(r=>{
	if(!(r[COL1.Location] in C1Object)){C1Object[r[COL1.Location]]=0};
	if(r[COL1.Type]=='Lead'){C1Object[r[COL1.Location]]+=1}else{log(r)}
})

//                                                                                        C2
HEADERS1=Object.keys(COL1)

LocationArray=[...new Set(rawData1.map(r=>r[COL1.Location]))].sort()
{const SELECT_TAG=document.querySelector('#LDD');
const TEMPLATE=document.querySelector('#LTemplate');
LocationArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.LOptionClass');
OPTION.textContent=v;
OPTION.value=i+1;
SELECT_TAG.appendChild(CLONE)
})}

OwnerArray=[...new Set(rawData1.map(r=>r[COL1.assigned]))].sort()
{const SELECT_TAG=document.querySelector('#ODD');
const TEMPLATE=document.querySelector('#OTemplate');
OwnerArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.OOptionClass');
OPTION.textContent=v;
OPTION.value=i+1;
SELECT_TAG.appendChild(CLONE)
})}

SourceArray=[...new Set(rawData1.map(r=>r[COL1.source]))].sort()
{
const SELECT_TAG0=document.querySelector('#SDD');
const TEMPLATE0=document.querySelector('#STemplate');
SourceArray.forEach((v,i)=>{const CLONE0=TEMPLATE0.content.cloneNode(true);
const OPTION0=CLONE0.querySelector('.SOptionClass');
OPTION0.textContent=v;
OPTION0.value=i+1;
SELECT_TAG0.appendChild(CLONE0)
})}



rawData1.forEach(r=>{
	if(!(r[COL1.source] in C2SetupObject)){C2SetupObject[r[COL1.source]]=0};
	C2SetupObject[r[COL1.source]]+=1
})


//									C3
try{rawData2=await ImportData('CPL')


rawData2.forEach(r=>{
	if(r[COL2.Month]=='Jan'){if(!(r[COL2.Day] in C3SetupObject)){C3SetupObject[r[COL2.Day]]=0};
	C3SetupObject[r[COL2.Day]]+=Number(r[COL2.CPL])}
})


MArray=[...new Set(rawData2.map(r=>`${MTom(r[COL2.Month])}/ ${r[COL2.Month]}`))].sort()
{
const SELECT_TAG=document.querySelector('#MDD');
const TEMPLATE=document.querySelector('#MTemplate');
MArray.forEach((v,i)=>{const CLONE=TEMPLATE.content.cloneNode(true);
const OPTION=CLONE.querySelector('.MOptionClass');
OPTION.textContent=v;
OPTION.value=i+1;
SELECT_TAG.appendChild(CLONE)
})}

console.log(MArray,C3SetupObject,COL2)

}catch(err){console.log(err)}

console.timeEnd("Data imported and processed in")

console.time("Charts made in")
handleChart();Show('MC',1);
console.timeEnd("Charts made in")

try{MakeDT()}catch(err){console.log(err)}
}
handleFileAsync()

