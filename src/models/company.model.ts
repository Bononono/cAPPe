import {Entity, Model, model, property} from '@loopback/repository';

@model()
export class Company extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  company_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
  })
  id_address: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
  })
  logo?: string;

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


  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
