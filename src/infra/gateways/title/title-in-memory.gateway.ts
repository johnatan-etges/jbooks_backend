import { Title } from "../../../enterprise/entities/title/title";
import { TitleGateway } from "../../../application/gateways/title/title.gateway";
import { Either, left, right } from "../../../shared/either";
import { ResourceNotFoundError, StorageServiceError } from "../../../shared/errors";

export class TitleInMemoryGateway implements TitleGateway {
  private static titles: Title[] = [];

  async create(title: Title): Promise<Either<StorageServiceError, Title>> {
    const titleToBeCreated = new Title(title.isbn, title.author, title.subject, title.copiesInStock);
    TitleInMemoryGateway.titles.push(
      titleToBeCreated
    );

    return right(titleToBeCreated);
  }

  async findAll(): Promise<Either<ResourceNotFoundError | StorageServiceError, Title[]>> {
    const clonedTitles: Title[] = [];
    
    TitleInMemoryGateway.titles.forEach(title => {
      clonedTitles.push(
        new Title(title.isbn, title.author, title.subject, title.copiesInStock)
      );
    });

    if (clonedTitles.length === 0) {
      return left(new ResourceNotFoundError("Title"));
    }

    return right(clonedTitles);
  }

  async findBySubject(subjectToSearch: string): Promise<Either<ResourceNotFoundError | StorageServiceError,  Title[]>> {
    const foundTitles: Title[] = [];

    TitleInMemoryGateway.titles.forEach(title => {
      if (title.subject.toLowerCase().includes(subjectToSearch.toLowerCase())) {
        foundTitles.push(
          new Title(title.isbn, title.author, title.subject, title.copiesInStock)
        );
      }
    });

    if (foundTitles.length === 0) {
      return left(new ResourceNotFoundError("Title"));
    }

    return right(foundTitles);
  }

  async findByAuthor(authorToSearch: string): Promise<Either<ResourceNotFoundError, Title[]>> {
      const foundTitles: Title[] = [];

      TitleInMemoryGateway.titles.forEach(title => {
        if (title.author.toLowerCase().includes(authorToSearch.toLowerCase())) {
          foundTitles.push(
            new Title(title.isbn, title.author, title.subject, title.copiesInStock)
          )
        }
      });

      if (foundTitles.length === 0) {
        return left(new ResourceNotFoundError("Title"));
      }

      return right(foundTitles);
  }

  async findByIsbnCode(isbnToSearch: number): Promise<Either<ResourceNotFoundError, Title>> {
      const foundTitles: Title[] | any = TitleInMemoryGateway.titles.map(title => {
        if (isbnToSearch === title.isbn) {
          return new Title(title.isbn, title.author, title.subject, title.copiesInStock)
        }
      });
      
      const foundTitle:Title | any = foundTitles[0] || null;

      if (!foundTitle) {
        return left(new ResourceNotFoundError("Title"));
      }

      return right(foundTitle);
  }

  async remove(titleToRemove: Title): Promise<Either<StorageServiceError, Title>> {
    TitleInMemoryGateway.titles = TitleInMemoryGateway.titles.filter(title => title !== titleToRemove);

    return right(titleToRemove);
  }
}