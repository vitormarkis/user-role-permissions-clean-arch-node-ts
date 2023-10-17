import MakeUserAdminPermission from "~/domain/entities/permission/MakeUserAdminPermission"
import { UseCase } from "~/domain/interfaces/UseCase"
import { UsersRepository } from "~/domain/repositories/UsersRepository"
import AdminRole from "~/domain/shared/role/AdminRole"
import { MakeUserAdminUseCaseDTO } from "~/domain/use-cases/MakeUserAdminUseCaseDTO"

export default class MakeUserAdminUseCase extends UseCase {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      requiredPermissions: [new MakeUserAdminPermission()],
    })
  }

  execute({ mandantUserUsername, newAdminUserUsername }: MakeUserAdminUseCaseDTO.Input) {
    const mandantUser = this.usersRepository.findByUsername(mandantUserUsername)
    const newAdminUser = this.usersRepository.findByUsername(newAdminUserUsername)
    const isAllowed = this.checkPermissions(mandantUser.role)
    if (!isAllowed) throw new Error("User don't have permission to make other admins.")
    newAdminUser.setRole(new AdminRole())
    this.usersRepository.update(newAdminUser)
  }
}
