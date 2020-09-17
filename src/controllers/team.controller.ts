// Uncomment these imports to begin using these cool features!

import {TokenService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {TokenServiceBindings} from '../components/jwt-authentication';
import {Team} from '../models';
import {model, property, repository} from "@loopback/repository";
import {TeamRepository} from "../repositories";


@model()
export class NewTeamRequest extends Team {
    @property({
        type: 'string',
        required: true,
    })
    teamid: string;
}

export class TeamController {
    constructor(
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @repository(TeamRepository)
        protected teamRepository: TeamRepository,
    ) {
    }


    @post('/createteam', {
        responses: {
            '200': {
                description: 'Team',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': Team,
                        },
                    },
                },
            },
        },
    })
    async createteam(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(NewTeamRequest, {
                        title: 'NewTeam',
                    }),
                },
            },
        })
            newTeamRequest: NewTeamRequest,
    ): Promise<Team> {
        const savedTeam = await this.teamRepository.create(newTeamRequest);

        return savedTeam;
    }

}
