const moment = require('moment');

// var date = new Date();

// console.log(date.getMonth());

// try to output
// Jan 1st 1970 00:00:10 am

var createdAt = 1234;
// var date = moment();
var date = moment(createdAt);
// date.add(100, 'years').subtract(9, 'months');
// console.log(date.format());
// console.log(date.format('MMM YYYY'));
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am padding for minutes, unpadded for hours, e.g. 6:01am
console.log(date.format('h:mm a'));

// equivalent
console.log('new Date().getTime()', new Date().getTime());
console.log('moment().valueOf()', moment().valueOf());
