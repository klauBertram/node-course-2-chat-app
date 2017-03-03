const expect = require('expect');

const { isRealString } = require('./validation');

// isRealString - describe
  // should reject non-string value
  // should reject string with only spaces
  // should allow strings with non-space characters 

describe('isRealString', () => {
  it('should reject non-string value', () => {
    var str = 98;

    expect(isRealString(str)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var str = '     ';

    expect(isRealString(str)).toBe(false);
  });

  it('should allow strings with non-space characters ', () => {
    var str = '    leading and ending spaces     ';

    expect(isRealString(str)).toBe(true);
  });
});