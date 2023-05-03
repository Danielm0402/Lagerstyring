import { Electrician } from "./electrician";

export class Admin extends Electrician{
    constructor(name, vankey){
        super(name, vankey)
    }

    changeVanKey(newVanKey){
        this.vanKey = newVanKey
    }
}