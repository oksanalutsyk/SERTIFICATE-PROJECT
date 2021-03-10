export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExipationDate: Date
  ) {}

  get token() {
    if (!this._tokenExipationDate || new Date() > this._tokenExipationDate) {
      return null;
    }
    return this._token;
  }
}
