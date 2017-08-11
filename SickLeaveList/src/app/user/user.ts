export class User {
  firstName: string;
  lastName: string;
  email: string;
  telephone: number;
  login: string;
  password: string;
  passwordConf: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    telephone: number,
    login: string,
    password: string,
    passwordConf: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.telephone = telephone;
    this.login = login;
    this.password = password;
    this.passwordConf = passwordConf;
  }

}
