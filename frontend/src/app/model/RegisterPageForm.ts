export class RegisterPageForm {
    username: String;
    email: String;
    password: String;

    constructor(data) {
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
    }
}