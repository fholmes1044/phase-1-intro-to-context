const { it } = require("mocha");

function createEmployeeRecord(employee){
  //console.log("EMPLOY", employee)
  return{
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour:employee[3],
    timeInEvents: [],
    timeOutEvents: [],

  }
}

function createEmployeeRecords(employees){
 return employees.map(employee => createEmployeeRecord(employee))
}


function createTimeInEvent( record, stamp){
 //console.log("record", record)
 //console.log("stamp", stamp)
 const stampArray = stamp.split(" ");
 //console.log("array", stampArray);
 const hour = stampArray[1]
 //console.log("hour", hour)
 const date = stampArray[0]
 //console.log("date", date)
 let timeInEvent = record.timeInEvents
 let eventObj = {
      type: "TimeIn",
      hour: parseInt(hour,10),
      date: date
}

timeInEvent.push(eventObj)
return record 
}

function createTimeOutEvent( record, stamp){
  const stampArray = stamp.split(" ");
  const hour = stampArray[1]
  const date = stampArray[0]
  let timeOutEvent = record.timeOutEvents
  let eventObj = {
       type: "TimeOut",
       hour: parseInt(hour,10),
       date: date
 }
 
 timeOutEvent.push(eventObj)
 return record 
 }

function hoursWorkedOnDate (record, date){
//console.log("DATEIN", date.timeInEvents[0].hour)
//console.log("DATEOUT",date.timeOutEvents[0].hour )
//console.log("record", record.timeInEvents)
const find1 = record.timeInEvents.find(element => element.date === date)
const find2 = record.timeOutEvents.find(element => element.date === date)
//console.log("find1", find1)
//console.log("HOUR1", find1.hour)
//console.log("find2", find2)
//console.log("HOUR2", find2.hour)
//let recordDate = find.date
//find on the record to find the date that matches the date 
const datein = find1.hour
const dateout = find2.hour
const hoursworked = (dateout - datein) / 100
//console.log("MONEY", hoursworked)
return hoursworked



 }

function wagesEarnedOnDate(record, date){
  //console.log("record", record)
  const payrate = record.payPerHour
  //console.log("payrate", payrate)
  const copy = hoursWorkedOnDate(record,date)
  //console.log("COPY", copy)
  const pay = payrate * copy
  //console.log("PAY", pay)
  return parseFloat(pay.toString())
  
}

function allWagesFor(record){
  let recordMap = record.timeInEvents.map(x => x.date)
  //console.log("MAP", recordMap)
  
  let datesLoop = recordMap.reduce(function(a,b){
    return a + wagesEarnedOnDate(record, b)
  },0)
  //console.log("datesloop", datesLoop)
  return datesLoop

  }

function calculatePayroll(array){
//console.log("array", array)
let dates = array.map(x =>  x.timeInEvents.map(m =>  m.date))

console.log("dates", dates)


let recordcall = array.map(x => allWagesFor(x))
console.log("call", recordcall)
//get the date 
//call map with wages earned on date
return recordcall.reduce((currentValue, total) => currentValue + total)
}





