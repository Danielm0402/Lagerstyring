
/*'
    elektriker 0..* <--> 0..* lagerbiler 
*/

export default class Electrician {
    constructor(name, licenseplate) {
        this.name = name
        this.licenseplate = licenseplate
    }

    changeLicenseplate(newLicenseplate){
        this.licenseplate = newLicenseplate
    }
    
}
