class BaseUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export class User extends BaseUser {
  id: number;
}

export class NewUser extends BaseUser {
  password: string;
}
