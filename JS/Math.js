//								Predefined constants

const DaysByMonth={1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31}

//								Calculated constants
const DATE_TODAY_IN_yyyymmdd=+(new Date().toISOString().split('T')[0].replace(/-/g,''))
DAYS_SINCE_FIRST_MONDAY=daysFrom(30101)
const lastMonday=(()=>{for(i=DATE_TODAY_IN_yyyymmdd;i>subtractWeek(DATE_TODAY_IN_yyyymmdd);i=subtractDay(i)){if(ModFunction(daysFrom(i)-DAYS_SINCE_FIRST_MONDAY,7)===0){return i}}})()
const nextMonday=addWeek(lastMonday)

function TakeMod(v){
	return (v**2)**0.5;
}
//Sets negative outputs to 0
function NegZero(v){
	return (v + TakeMod(v))/2
}
//Takes a in (mod b)
function ModFunction(a,b) {
	return (a-(b*Math.floor(a/b)));
}
//Returns b if a is falsy
function Or(a,b){if(a){return a}else{return b}}


//								Date converters

function ymdTom(ymdDate){
	return (ymdDate-(10000*Math.floor(ymdDate/10000))-ymdDate+(100*Math.floor(ymdDate/100)))/100
}
function mToM(m){switch(m){
case 1:return "Jan";case 2:return "Feb";case 3:return "Mar";case 4:return "Apr";case 5:return "May";case 6:return "Jun";case 7:return "Jul";case 8:return "Aug";case 9:return "Sep";case 10:return "Oct";case 11:return "Nov";case 12:return "Dec";
}}
function ymdToM(v){return mToM(ymdTom(v))}
function MTom(M){switch(M){case "January": return 1;case "February": return 2;case "March": return 3;case "April": return 4;case "June": return 6;case "July": return 7;case "August": return 8;case "September": return 9;case "October": return 10;case "November": return 11;case "December": return 12;case "Jan": return 1;case "Feb": return 2;case "Mar": return 3;case "Apr": return 4;case "May": return 5;case "Jun": return 6;case "Jul": return 7;case "Aug": return 8;case "Sep": return 9;case "Oct": return 10;case "Nov": return 11;case "Dec": return 12;}}

function mmddTodd(Date,Year=0){
	const a=ModFunction(Date,100)
	const b=(Date-a)/100
	let c=0
	switch(b-1){
		case 11: c+=30
		case 10: c+=31
		case 9: c+=30
		case 8: c+=31
		case 7: c+=31
		case 6: c+=30
		case 5: c+=31
		case 4: c+=30
		case 3: c+=31
		case 2: c+=(ModFunction(Year,4)===0?29:28)
		case 1: c+=31; break;
	}
	const d=c+a
	return d
}
//Days from 1st Jan 0000 incusive. can take from any year
function yymmddTodd(Date,StartYear=0){
	const a=Math.floor(Date/10000)-StartYear
	const b=Date-10000*a
	const c=mmddTodd(b,a)
	const d=Math.floor(a/4)
	const a0=a-4*d
	const b0=d*1461
	const c0=a0*365
	const d0=c+b0+c0
	return d0
}

function DateTodayIndd(FromYear=2000){
	const a=Date.now()
	const b=Date.UTC(FromYear,1,1)
	const c=Math.floor((a-b)/86400000)
	return c
}
function daysBetween(Date1,Date2){
	const a=yymmddTodd(Date1)-yymmddTodd(Date2)
	return a
}

function daysFrom(Date0){return daysBetween(DATE_TODAY_IN_yyyymmdd,Date0)}

function subtractMonth(Date){return (ModFunction(Date,10000)-ModFunction(Date,100)===100?Date-10000+1100:Date-100)}
function addMonth(Date){return (ModFunction(Date,10000)-ModFunction(Date,100)===1200?Date+10000-1100:Date+100)}
function subtractWeek(Date){const Day=ModFunction(Date,100);if(Day<=7){return (100*Math.floor(subtractMonth(Date)/100)+DaysByMonth[(ModFunction(Date,10000)-ModFunction(Date,100))/100]-8+Day);};return Date-7}
function addWeek(Date){const Day=ModFunction(Date,100);const m=(ModFunction(Date,10000)-ModFunction(Date,100))/100;if(Day>DaysByMonth[m]-7){return (100*Math.floor(addMonth(Date)/100)+Day-DaysByMonth[m]+7);};return Date+7}
function subtractDay(Date){const Day=ModFunction(Date,100);if(Day===1){return (100*Math.floor(subtractMonth(Date)/100)+DaysByMonth[(ModFunction(Date,10000)-ModFunction(Date,100))/100+1]);};return Date-1}
function addDay(Date){const Day=ModFunction(Date,100);const m=(ModFunction(Date,10000)-ModFunction(Date,100))/100;if(Day===DaysByMonth[m]){return (100*Math.floor(addMonth(Date)/100)+1);};return Date+1}
