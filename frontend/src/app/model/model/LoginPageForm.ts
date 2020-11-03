export class LoginPageForm {
    username: String;
    password: String;

    constructor(data) {
        this.username = data.username;
        this.password = data.password;
    }
}