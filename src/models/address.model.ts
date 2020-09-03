import {Entity, Model, model, property} from '@loopback/repository';

@model()
export class Address extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  address_id?: string;

  @property({
    type: 'string',
  })
  streetname: string;

  @property({
    type: 'string',
  })
  house_nr: string;

  @property({
    type: 'string',
  })
  plz?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  country?: string;

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


  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
