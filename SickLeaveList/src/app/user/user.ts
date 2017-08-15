export class User {
  firstName: string;
  lastName: string;
  email: string;
  telephone: number;
  login: string;
  password: string;
  passwordConf: string;
  list:  object [];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    telephone: number,
    login: string,
    password: string,
    passwordConf: string,
    list: object []
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.telephone = telephone;
    this.login = login;
    this.password = password;
    this.passwordConf = passwordConf;
    this.list = list;
  }

}
