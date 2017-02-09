const expect = require('expect');

const { generateMessage } = require('./message');

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