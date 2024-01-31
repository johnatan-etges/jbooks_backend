export class InvalidDocumentTypeError extends Error {
  constructor(documentType: string) {
    super(`Invalid document for type: ${documentType}`);
    this.name = "InvalidDocumentTypeError";
  }
}