
/*'
    elektriker 0..* <--> 0..* lagerbiler 
*/

export default class Electrician {
    constructor(name, employeeId) {
        this.name = name;
        this.employeeId = employeeId;
        this.vans = [];
    }

    addVan(van) {
        if (!this.vans.includes(van)) {
            this.vans.push(van)
        }
    }

    removeVan(van) {
        const index = this.vans.findIndex(van);

        if(index > -1)
            this.vans.splice(index, 1);
    }


    toJSON() {
        return {name: this.name, employeeId: this.employeeId, vans: this.vans}
    }
    
}
