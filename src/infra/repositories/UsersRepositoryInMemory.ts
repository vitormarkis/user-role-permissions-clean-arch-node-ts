import User from "~/domain/entities/User"
import { UsersRepository } from "~/domain/repositories/UsersRepository"

export default class UsersRepositoryInMemory implements UsersRepository {
  users: User[] = []

  constructor() {}
  createUser(user: User): void {
    this.users.push(user)
  }

  findById(id: string): User {
    const user = this.users.find(u => u.id.value === id)
    if (!user) throw new Error("User not found.")
    return user
  }

  findByUsername(username: string): User {
    const user = this.users.find(u => u.username === username)
    if (!user) throw new Error("User not found.")
    return user
  }

  update(user: User): void {
    this.users = this.users.map(currentUser => (currentUser.id === user.id ? user : currentUser))
  }
}
