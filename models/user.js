

export default class User {
    constructor(name, employeeId, username, password, role) {
        this.name = name;
        this.employeeId = employeeId;
        this.username = username;
        this.password = password;
        this.role = role;
        this.vans = [];
    }

    addVan(van) {
        if (!this.vans.includes(van.toJSON())) {
            this.vans.push(van)
        }
    }

    removeVan(van) {
        const index = this.vans.findIndex(van);

        if(index > -1)
            this.vans.splice(index, 1);
    }


    toJSON() {
        const json = {
            name: this.name, 
            employeeId: this.employeeId, 
            username: this.username,
            password: this.password,
            role: this.role,
            vans: this.vans.map(van => van.licensePlate)
        }
        return json;
    }


    changeLicenseplate(newLicenseplate){
        this.licenseplate = newLicenseplate
    }
    
}
