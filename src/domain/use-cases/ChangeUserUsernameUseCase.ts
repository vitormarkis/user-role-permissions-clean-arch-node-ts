import ChangeUserUsernamePermission from "~/domain/entities/permission/ChangeUserUsernamePermission"
import { UseCase } from "~/domain/interfaces/UseCase"
import { UsersRepository } from "~/domain/repositories/UsersRepository"
import { ChangeUserUsernameDTO } from "~/domain/use-cases/ChangeUserUsernameDTO"

export default class ChangeUserUsernameUseCase extends UseCase {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      requiredPermissions: [new ChangeUserUsernamePermission()],
    })
  }
  execute({ changingUserUsername, mandantUsername, newUsername }: ChangeUserUsernameDTO.Input) {
    const mandantUser = this.usersRepository.findByUsername(mandantUsername)
    const changingUser = this.usersRepository.findByUsername(changingUserUsername)

    const isAllowed = this.checkPermissions(mandantUser.role, changingUser.role)
    if (!isAllowed) {
      throw new Error(
        `User's role: ${mandantUser.role.name}, can't change username of user's role: ${changingUser.role.name}`,
      )
    }

    changingUser.username = newUsername
    this.usersRepository.update(changingUser)
  }
}
