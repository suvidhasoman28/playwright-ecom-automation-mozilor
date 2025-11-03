
/**
 * Helper class for generating dynamic test data
 * such as usernames, emails, and passwords.
 * 
 * Uses a random number for uniqueness across test runs.
 */
export class Helper {
    readonly randomNumber:number;
    constructor(){
        this.randomNumber = Math.floor(Math.random() * 1000);

    }

    //Generate a unique username
    async generateUserName() {
        const username = "user" + this.randomNumber;
        return username;

    }

    //Generate a unique password
    async generatePassword() {
        const password = "Abcd@" + this.randomNumber;
        return password;

    }

    //Generate a unique email
    async generateEmail() {
        const email = `hellouser${this.randomNumber}@gmail.com`;
        return email;

    }
}