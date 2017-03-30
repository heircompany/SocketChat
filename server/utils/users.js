[{
    id: `/l5lgjoo200bn71sx`,
    name: `Joe`,
    channel: `SocketChannel`
}];

class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, channel) {
        let user = {id, name, channel};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        // return deleted user object
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser (id) {
        // return found user object
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(channel) {
        let users = this.users.filter((user) => user.channel === channel);
        let namesArray = users.map((user) => user.name);
        return namesArray;
    }
};

module.exports = {Users};
