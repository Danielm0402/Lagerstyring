import Electrician from "../models/electrician.js";
import Van from "../models/van.js";


export function test() {
    console.log("test")
}

export default class Controller {
    test() {
        const v = new Van("Ab12345");
        const e = new Electrician("Oliver");
        v.addElectrician(e);
        e.addVan(v);
    }

    createVan(licensePlate, owner, vanKey){
        const van = new Van(licensePlate, owner, vanKey)
        return van
    }
}
