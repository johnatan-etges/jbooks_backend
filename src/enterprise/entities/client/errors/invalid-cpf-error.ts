export class InvalidCpfError extends Error {
  constructor(cpf: number) {
    super(`Invalid CPF: ${cpf}`);
    this.name = "InvalidCpfError";
  }
}