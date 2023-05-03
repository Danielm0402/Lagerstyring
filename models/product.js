
/*
    product 0..* komposition 1 lagerbil
*/

class Product {
    constructor(name, amount, unit, vanKey) {
        this.name = name
        this.amount = amount
        this.unit = unit
        this.vanKey = vanKey
    }

    getVanKey(){
        return this.vanKey
    }


}