const expect = require(`expect`);
const {Users} = require(`./users`);

describe(`Users`, () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Ryan',
            channel: 'SocketChannel'
        }, {
            id: '2',
            name: 'Nathan',
            channel: 'SalesChannel'
        }, {
            id: '3',
            name: 'Greg',
            channel: 'SocketChannel'
        }];
    });

    it(`should add new user`, () => {
        let users = new Users();
        let user = {
            id: `123`,
            name: `joe`,
            channel: `socketchannel`
        };
        let resUser = users.addUser(user.id, user.name, user.channel);

        expect(users.users).toEqual([user]);
    });

    it(`should remove a user`, () => {
        let userId = '1';
        let user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it(`should not remove user`, () => {
        let userId = '100';
        let user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it(`should find a user`, () => {
        let userId = '2';
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it(`should not find user`, () => {
        let userId = '100';
        let user = users.getUser(userId);
        expect(user).toNotExist();
    });

    it(`should return names for SocketChannel`, () => {
        let userList = users.getUserList('SocketChannel');
        expect(userList).toEqual(['Ryan', 'Greg'])
    });

    it(`should return names for SalesChannel`, () => {
        let userList = users.getUserList('SalesChannel');
        expect(userList).toEqual(['Nathan'])
    });

    // it(`should reject string with only space characters`, () => {
    //     let res = isRealString('       ');
    //     expect(res).toBe(false);
    // });
    //
    // it(`should accept string with non-space characters`, () => {
    //     let res = isRealString('   puddles ');
    //     expect(res).toBe(true);
    // });
});
