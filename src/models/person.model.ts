import {Entity, Model, model, property} from '@loopback/repository';

@model()
export class Person extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  person_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
  })
  middlename: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  telephone_number?: string;

  @property({
    type: 'date',
    required: true,
  })
  last_changed: string;

  @property({
    type: 'boolean',
    required: true,
  })
  deleted: boolean;


  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
