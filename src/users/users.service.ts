import { Injectable } from '@nestjs/common';
import { userInfo } from 'os';

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
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        return user
    }

    create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }){
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser  = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }){
        this.users = this.users.map(user => {
            if (user.id === id){
                return{...user, ...updatedUser}
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number){
        const removedUsers = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUsers
    }
}
