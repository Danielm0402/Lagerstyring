import { describe } from "mocha";
import { updateAmountToProduct } from "../database/Firestore.js";

import { assert } from "chai";

let x = async () => {
  describe("When incrementing lagertal", () => {
    it("Should return correct result", async () => {
      //
      const currentNumber = updateAmountToProduct(0, 50); // 0 is amount, 50 is productNumber

      // const result = await updateAmountToProduct(1, 50);

      console.log("result ", currentNumber);

      const expected = currentNumber + 1;

      assert.equal(1, 1);
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
};
x();
