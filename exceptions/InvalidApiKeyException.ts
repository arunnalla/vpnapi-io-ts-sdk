export class InvalidApiKeyException extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
