const moment = require('moment');

// var date = new Date();

// console.log(date.getMonth());

// try to output
// Jan 1st 1970 00:00:10 am

var date = moment();
date.add(100, 'years').subtract(9, 'months');
console.log(date.format());
console.log(date.format('MMM YYYY'));
console.log(date.format('MMM Do, YYYY'));

// 10:35 am padding for minutes, unpadded for hours, e.g. 6:01am
console.log(date.format('h:mm a'));