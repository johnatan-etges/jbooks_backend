import { Title } from "../../../entities/title/title";
import { TitleGateway } from "../../../application/gateways/title/title.gateway";

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
}