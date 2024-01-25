import { Title } from "../../../../src/enterprise/entities/title/title";

export const validTitle: Title = new Title(1234567891011, 'Valid author', 'Valid subject', 0);

export const validAuthorSearchExpressions = [
  'valid author',
  'Valid author',
  'valid Author',
  'alid autho',
  'valid',
  'author'
];

export const validSubjectSearchExpressions = [
  'valid subject',
  'alid subjec',
  'valid',
  'subject'
];

export const invalidAuthorSearchExpression = 'invalid';
export const anyAuthorSearchExpression = 'any author';
export const shortAuthorSearchExpression = 'aa';

export const invalidSubjectSearchExpression = 'invalid';
export const anySubjectSearchExpression = 'any subject';
export const shortSubjectSearchExpression = 'an'