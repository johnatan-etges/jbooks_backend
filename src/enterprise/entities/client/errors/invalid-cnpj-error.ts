export class InvalidCnpjError extends Error {
  constructor(cnpj: number) {
    super(`Invalid CNPJ: ${cnpj}`);
    this.name = "InvalidCnpjError";
  }
}