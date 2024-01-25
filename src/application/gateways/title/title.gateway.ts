import { Title } from "../../../enterprise/entities/title/title";

export interface TitleGateway {
  create(title: Title): Promise<void>;
  findAll(): Promise<Title[]>;
  findBySubject(subjectToSearch: string): Promise<Title[]>;
  findByAuthor(authorToSearch: string): Promise<Title[]>;
}