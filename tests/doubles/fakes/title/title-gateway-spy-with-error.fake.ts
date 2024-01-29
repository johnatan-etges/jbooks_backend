import { Title } from "../../../../src/enterprise/entities/title/title";
import { TitleGateway } from "../../../../src/application/gateways/title/title.gateway";
import { Either, left } from "../../../../src/shared/either";
import { StorageServiceError } from "../../../../src/shared/errors";

export class TitleInMemoryGatewaySpyWithError implements TitleGateway {
  async create(title: Title): Promise<void> {
    throw new Error();    
  }

  async findAll(): Promise<Title[]> {
    throw new Error();
  }

  async findBySubject(subjectToSearch: string): Promise<Title[]> {
    throw new Error();
  }

  async findByAuthor(authorToSearch: string): Promise<Title[]> {
    throw new Error();
  }

  async findByIsbnCode(isbnToSearch: number): Promise<Either<StorageServiceError, Title>> {
    return left(new StorageServiceError());  }
}