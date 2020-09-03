import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Company} from '../models';
import {CompanyRepository} from '../repositories';

export class CompaniesController {
  constructor(
    @repository(CompanyRepository)
    public companyRepository : CompanyRepository,
  ) {}

  @post('/companies', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Company)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {
            title: 'NewCompany',
            exclude: ['company_id'],
          }),
        },
      },
    })
    company: Omit<Company, 'company_id'>,
  ): Promise<Company> {
    return this.companyRepository.create(company);
  }

  @get('/companies/count', {
    responses: {
      '200': {
        description: 'Company model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Company) where?: Where<Company>,
  ): Promise<Count> {
    return this.companyRepository.count(where);
  }

  @get('/companies', {
    responses: {
      '200': {
        description: 'Array of Company model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Company, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Company) filter?: Filter<Company>,
  ): Promise<Company[]> {
    return this.companyRepository.find(filter);
  }

  @patch('/companies', {
    responses: {
      '200': {
        description: 'Company PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true}),
        },
      },
    })
    company: Company,
    @param.where(Company) where?: Where<Company>,
  ): Promise<Count> {
    return this.companyRepository.updateAll(company, where);
  }

  @get('/companies/{id}', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Company, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Company, {exclude: 'where'}) filter?: FilterExcludingWhere<Company>
  ): Promise<Company> {
    return this.companyRepository.findById(id, filter);
  }

  @patch('/companies/{id}', {
    responses: {
      '204': {
        description: 'Company PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true}),
        },
      },
    })
    company: Company,
  ): Promise<void> {
    await this.companyRepository.updateById(id, company);
  }

  @put('/companies/{id}', {
    responses: {
      '204': {
        description: 'Company PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() company: Company,
  ): Promise<void> {
    await this.companyRepository.replaceById(id, company);
  }

  @del('/companies/{id}', {
    responses: {
      '204': {
        description: 'Company DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.companyRepository.deleteById(id);
  }
}
