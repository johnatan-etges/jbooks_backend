import { Title } from "../../../enterprise/entities/title/title";
import { Either } from "../../../shared/either";
import { ResourceNotFoundError, StorageServiceError } from "../../../shared/errors";

export interface TitleGateway {
  create(title: Title): Promise<Either<ResourceNotFoundError | StorageServiceError, Title>>;
  findAll(): Promise<Either<ResourceNotFoundError | StorageServiceError, Title[]>>;
  findBySubject(subjectToSearch: string): Promise<Either<ResourceNotFoundError | StorageServiceError, Title[]>>;
  findByAuthor(authorToSearch: string): Promise<Either<ResourceNotFoundError | StorageServiceError, Title[]>>;
  findByIsbnCode(isbnToSearch: number): Promise<Either<ResourceNotFoundError | StorageServiceError, Title>>;
  remove(title: Title): Promise<Either<StorageServiceError, Title>>;
}