const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'kenn',
      room: 'node course'
    }, {
      id: '2',
      name: 'tony',
      room: 'react course'
    }, {
      id: '3',
      name: 'pepper',
      room: 'node course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'kenn',
      room: 'node course'
    };

    var result = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([result]);
  });

  it('should remove a user', () => {
    // pass id
    // assert user is removed
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    // pass id that does not exist
    // examine array did not change
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    // pass id and get user object back
    var userId = '1';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    // pass invalid id and should not get user object back
    var userId = '99';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('node course');

    expect(userList).toEqual(['kenn', 'pepper']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('react course');

    expect(userList).toEqual(['tony']);
  });
});