const expect = require(`expect`);
const {generateMessage, generateLocationMessage} = require(`./message`);

describe(`generateMessage`, () => {
    it(`should generate a message`, () => {
        let from = `joe`;
        let text = `test message`;
        let message = generateMessage(from, text);
                // assert createdAt is number
        expect(message.createdAt).toBeA(`number`);
                // assert matching values
        expect(message).toInclude({from, text});
    });
});

describe(`generateLocationMessage`, () => {
    it(`should generate a shared location`, () => {
        let from = `Admin`;
        let latitude = 10;
        let longitude = 11;
        let url = `https://www.google.com/maps?q=10,11`;
        let message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA(`number`);
        expect(message).toInclude({from, url});
    });
});
