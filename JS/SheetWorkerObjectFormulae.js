let COL1={},COL2={},COL3={}

async function ImportData(TYPE){
	console.time(`${TYPE} data imported in`);
	let url;
	url="1IsBw2wietf18Zcf0wHik7pBmBctALCtweStcPPphbE0";
	const RESPONSE=await fetch(`https://opensheet.elk.sh/${url}/${TYPE}`);    
	if (!RESPONSE.ok) throw new Error('Network response was not ok');
	const arrayOfObjects = await RESPONSE.json();
	const headers=Object.keys(arrayOfObjects[0]);
//					SETUP TYPES
	switch(TYPE){
	case 'Leads':
		headers.forEach((H,i)=>COL1[H]=i);
		break;

	case 'CPL':
		headers.forEach((H,i)=>COL2[H]=i);
		break;
	case 'Labels':
		headers.forEach((H,i)=>COL3[H]=i);
		break;
	}

	RD=arrayOfObjects.map(obj => Object.keys(arrayOfObjects[0]).map(key => obj[key]));
	console.timeEnd(`${TYPE} data imported in`);

	return RD
}