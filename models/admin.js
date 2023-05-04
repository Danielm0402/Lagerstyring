import { Electrician } from "./electrician";

export class Admin extends Electrician{
    constructor(name, licenseplate){
        super(name, licenseplate)
    }

    changeLicenseplate(newLicenseplate){
        this.licenseplate = newLicenseplate
    }
}