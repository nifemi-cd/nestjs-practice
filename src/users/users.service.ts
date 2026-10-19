import { Injectable } from '@nestjs/common';
import { userInfo } from 'os';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { "id": 1, "name": "Nifemi Tawoju", "email": "tawojunifeoo@yahoo.com", "role": "ADMIN" },
        { "id": 2, "name": "Damilola Tawoju", "email": "tawojudamioo@yahoo.com", "role": "ENGINEER" },
        { "id": 3, "name": "A Tawoju", "email": "a@yahoo.com", "role": "INTERN" },
        { "id": 4, "name": "S Tawoju", "email": "s@yahoo.com", "role": "ADMIN" },
        { "id": 5, "name": "F Tawoju", "email": "f@yahoo.com", "role": "ADMIN" },
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User Role Not Found')
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) throw new NotFoundException('User Not Found')
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removedUsers = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUsers
    }
}
