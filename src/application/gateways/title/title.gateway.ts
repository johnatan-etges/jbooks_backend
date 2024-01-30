import { Title } from "../../../enterprise/entities/title/title";
import { Either } from "../../../shared/either";
import { ResourceNotFoundError, StorageServiceError } from "../../../shared/errors";

export interface TitleGateway {
  create(title: Title): Promise<void>;
  findAll(): Promise<Title[]>;
  findBySubject(subjectToSearch: string): Promise<Either<ResourceNotFoundError | StorageServiceError, Title[]>>;
  findByAuthor(authorToSearch: string): Promise<Title[]>;
  findByIsbnCode(isbnToSearch: number): Promise<Either<ResourceNotFoundError | StorageServiceError, Title>>;
}