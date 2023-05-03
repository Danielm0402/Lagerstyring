import { Electrician } from "../models/electrician.js";
import { Van } from "../models/van.js";


const var1 = "dette er 1 test"
const var2 = "dette er 2 test"

export default class Controller {

    foo() {
        const v = new Van("Ab12345");
        const e = new Electrician("Oliver");
        v.addElectrician(e);
        e.addVan(v);
    }

    getVar1() {
        return var1;
    }

    getVar2() {
        return var2;
    }
}


