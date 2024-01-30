import { Title } from "../../../enterprise/entities/title/title";
import { Either } from "../../../shared/either";
import { ResourceNotFoundError, StorageServiceError } from "../../../shared/errors";

export interface TitleGateway {
  create(title: Title): Promise<Either<ResourceNotFoundError | StorageServiceError, Title>>;
  findAll(): Promise<Title[]>;
  findBySubject(subjectToSearch: string): Promise<Either<ResourceNotFoundError | StorageServiceError, Title[]>>;
  findByAuthor(authorToSearch: string): Promise<Either<ResourceNotFoundError | StorageServiceError, Title[]>>;
  findByIsbnCode(isbnToSearch: number): Promise<Either<ResourceNotFoundError | StorageServiceError, Title>>;
}