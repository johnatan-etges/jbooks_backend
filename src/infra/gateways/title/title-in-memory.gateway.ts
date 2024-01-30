import { Title } from "../../../enterprise/entities/title/title";
import { TitleGateway } from "../../../application/gateways/title/title.gateway";
import { Either, left, right } from "../../../shared/either";
import { ResourceNotFoundError, StorageServiceError } from "../../../shared/errors";

export class TitleInMemoryGateway implements TitleGateway {
  private static titles: Title[] = [];

  async create(title: Title): Promise<void> {
    TitleInMemoryGateway.titles.push(
      new Title(title.isbn, title.author, title.subject, title.copiesInStock)
    );

    return Promise.resolve();
  }

  async findAll(): Promise<Title[]> {
    const clonedTitles: Title[] = [];
    
    TitleInMemoryGateway.titles.forEach(title => {
      clonedTitles.push(
        new Title(title.isbn, title.author, title.subject, title.copiesInStock)
      );
    });

    return clonedTitles;
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
}