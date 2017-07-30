const util = require("../util.js");

const dummyProps = {
    thing: {},
    bloop: {hey: "floop"}
}

describe("util", () => {
    test("it has propsToArray function", () => {
        expect(util.propsToArray).toBeDefined();
    });

    test("it's propsToArray function can turn things into an array", () => {
        expect(Array.isArray(util.propsToArray(dummyProps))).toBe(true);
    });
})
