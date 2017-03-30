[{
    id: `/l5lgjoo200bn71sx`,
    name: `Joe`,
    channel: `SocketChannel`
}];

//addUser(id, name, channel)
//removeUser(id)
//getUser(id)
//getUserList(channel)

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

// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }
//
// let me = new Person('joe', 26);
// let description = me.getUserDescription();
// console.log(description);
