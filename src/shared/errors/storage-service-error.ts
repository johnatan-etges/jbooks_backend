export class StorageServiceError extends Error {
  constructor() {
    super("Storage error");
    this.name = "StorageServiceError";
  }
}