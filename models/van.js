/*
    elektriker 0..* <--> 0..* lagerbiler 
*/

/*
    product 0..* komposition 1 lagerbil
*/

export default class Van {

    constructor(licensePlate) {
        this.licensePlate = licensePlate;
        this.user = ""
        this.products = []
    }

    setUser(user) {
        this.user = user.employeeId
    }

    removeUser() {
        this.user = ""
    }

  addProduct(productId) {
    if (!this.products.includes(productId)) {
      this.products.push(productId);
      console.log("this.products", this.products);
    }
  }

  createProduct(name, amount, unit) {
    let newProduct = new product(name, amount, unit);
    this.products.push(newProduct);
    return newProduct;
  }

  removeProduct(product) {
    if (this.products.includes(product)) {
      this.products.slice(this.products.indexOf(product), 1);
    }
  }

  toJSON() {
    const json = {
        licensePlate: this.licensePlate,
        users: this.users.map(e => e.employeeId),
        products: this.products.map(p => p.name)
    }
    return json;
    }
}
