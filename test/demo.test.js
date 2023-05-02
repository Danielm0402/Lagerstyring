import { assert } from "chai";
import Controller from "../controllers/controller.js";

const c = new Controller()

describe('When calling getVar1', () => {
    it('Should return var1', () => {
        const result = c.getVar1();

        assert.equal(result, 'dette er 1 test')
    })

    it('Should return var2', () => {
        const result = c.getVar2();

        assert.equal(result, 'dette er 2 test')
    })
})