import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller('users') // /users router
export class UsersController {
   
    constructor(private readonly usersService: UsersService){}

    @Get() //GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role)
    }

    @Get('interns') //GET /users/interns
    findAllInterns() {
        return []
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }

    @Post() //POST /users
    create(@Body() user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }){
        return this.usersService.create(user)
    }

    @Patch(':id') //GET /users/:id
    update(@Param('id') id: string, @Body() userUpdate: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return this.usersService.update(+id, userUpdate)
    }

    @Delete(':id') //DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id)
    }
}
