import { assert } from "chai";

function add(a: number, b: number): number {
    return a + b;
}

describe("Add", function() {
    it("Should add two numbers", function() {
        assert.equal(add(2, 3), 5);
    });

    it("Should add two negative numbers", function() {
        assert.equal(add(-2, 3), 1);
    });
});