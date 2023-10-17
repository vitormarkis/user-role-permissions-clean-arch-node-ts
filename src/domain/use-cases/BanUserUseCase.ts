import { UsersRepository } from "~/domain/repositories/UsersRepository"
import BanUserPermission from "~/domain/entities/permission/BanUserPermission"
import BannedStatus from "~/domain/entities/user/status/BannedStatus"
import { UseCase } from "~/domain/interfaces/UseCase"
import { BanUserDTO } from "~/domain/use-cases/BanUserDTO"

export default class BanUserUseCase extends UseCase {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      requiredPermissions: [new BanUserPermission()],
    })
  }

  execute({ banningUserUsername, mandantUserUsername }: BanUserDTO.Input) {
    const mandantUser = this.usersRepository.findByUsername(mandantUserUsername)
    const bannedUser = this.usersRepository.findByUsername(banningUserUsername)

    const isAllowedToBan = this.checkPermissions(mandantUser.role, bannedUser.role)

    if (!isAllowedToBan) {
      throw new Error("This user don't have permission to ban anyone.")
    }

    bannedUser.setStatus(new BannedStatus())

    this.usersRepository.update(bannedUser)
  }
}
