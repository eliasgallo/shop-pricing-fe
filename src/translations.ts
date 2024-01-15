const json = {
  login_button: 'Log in',
  logout_button: 'Log out',
}

export class Translations {
  constructor() {}
  translation(key: keyof typeof json): string {
    return json[key]
  }
}
