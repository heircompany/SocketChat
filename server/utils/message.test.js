const expect = require(`expect`);
const {generateMessage} = require(`./message`);

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
