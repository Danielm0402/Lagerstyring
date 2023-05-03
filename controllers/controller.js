import { Electrician } from "../models/electrician";
import { Van } from "../models/van";


export class Controller {
    test() {
        const v = new Van("Ab12345");
        const e = new Electrician("Oliver");
        v.addElectrician(e);
        e.addVan(v);
    }
}