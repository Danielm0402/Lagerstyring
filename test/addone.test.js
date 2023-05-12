const assert = require("chai").assert;
const { expect } = require("chai");
const { updateAmountToProduct } = require("../database/Firestore.js");

describe("When incrementing lagertal", () => {
  it("Should return correct result", () => {
    const currentNumber = updateAmountToProduct(0, 50); // 0 is amount, 50 is productNumber

    const result = updateAmountToProduct(1, 50);

    const expected = currentNumber + 1;

    assert.equal(result, expected);

    // havde jeg brugt should: BDD
    //result.should.be.equal(3)
  });

  //   it("has a big number", () => {
  //     const result = add(8000, 1000);
  //     assert.equal(result, 9000);
  //   });

  //   // der findes også assert.oneOf og assert.isString osv osv...

  //   it("Should return another correct result", () => {
  //     const result = add(1, 3);
  //     assert.equal(result, 4);
  //   });
});
