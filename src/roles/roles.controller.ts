import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role} from "./roles.model";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: 'create role'})
    @ApiResponse({status: 201, type: Role})
    @Post()
    createRole(@Body() dto: CreateRoleDto){
        return this.roleService.createRole(dto)
    }

    @ApiOperation({summary: 'get role by name'})
    @ApiResponse({status: 200, type: Role})
    @Get(':name')
    getRoleByName(@Param('name') name:string){
        return this.roleService.getRoleByName(name)
    }
}
