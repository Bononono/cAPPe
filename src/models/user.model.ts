import {Entity, Model, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  user_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  user_role: number;

  @property({
    type: 'date',
    required: true,
  })
  last_login: string;

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


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
