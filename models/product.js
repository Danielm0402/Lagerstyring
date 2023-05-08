
/*
    product 0..* komposition 1 lagerbil
*/

export default class Product {
    constructor(name, productId, amount, unit) {
        this.name = name
        this.productId = productId
        this.amount = amount
        this.unit = unit
    }

    toJSON() {
        const json = {
            name: this.name,
            productId: this.productId,
            amount: this.amount,
            unit: this.unit,
        }
        return json;
    }
}