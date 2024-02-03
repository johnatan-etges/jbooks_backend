export class InvalidPhoneError extends Error {
  constructor(phone: number) {
    super(`Invalid phone number: ${phone}`);
    this.name = "InvalidPhoneError";
  }
}