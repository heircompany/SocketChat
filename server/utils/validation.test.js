const expect = require(`expect`);
const {isRealString} = require(`./validation`);

describe(`isRealString validation`, () => {
    it(`should reject non-string values`, () => {
        let res = isRealString(11);
        expect(res).toBe(false);
    });

    it(`should reject string with only space characters`, () => {
        let res = isRealString('       ');
        expect(res).toBe(false);
    });

    it(`should accept string with non-space characters`, () => {
        let res = isRealString('   puddles ');
        expect(res).toBe(true);
    });
});
