const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store res in variable
    // assert from match  
    // assert text match
    // assert createdAt is a number
    let from = "tony stark";
    let text = "i am iron man";
    let messageObj = generateMessage(from, text);

    // expect(messageObj.from).toEqual(from);
    // expect(messageObj.text).toEqual(text);
    expect(messageObj).toInclude({
      from,
      text
    });
    expect(messageObj.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    // pass in lat/long
    // from is correct
    // createdAt is a number
    // url is what you expect
    let from = 'tony stark';
    let lat = 1;
    let long = 1;
    let url = `https://www.google.com/maps?q=${lat},${long}`
    let messageObj = generateLocationMessage(from, lat, long);

    expect(messageObj.from).toBe(from);
    expect(messageObj.createdAt).toBeA('number');
    expect(messageObj.url).toBe(url);
    /* alternative to do this, but error report is message 
     * if object is big
     */
    // expect(messageObj).toInclude({
    //   from,
    //   url
    // });
  });
});