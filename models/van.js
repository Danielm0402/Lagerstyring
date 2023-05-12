/*
    elektriker 0..* <--> 0..* lagerbiler 
*/

/*
    product 0..* komposition 1 lagerbil
*/

export default class Van {

    constructor(number, licensePlate) {
        this.number = number
        this.licensePlate = licensePlate;
        this.user = user;
        this.products = []
    }

    addUser(newUser) {
        if(!user){
          this.user = newUser
        }
    }

    removeUser(user) {
        if(user){
          this.user = null;
        }
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
            user: this.user,
            products: this.products.map(p => p.name)
        }
        return json;
    }
}
