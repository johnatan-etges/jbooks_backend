import { Title } from "../../../../src/enterprise/entities/title/title";
import { validIsbn } from "./isbn.asset";

export const validTitle: Title = new Title(validIsbn, 'Valid author', 'Valid subject', 0);