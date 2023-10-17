import ChangeUserUsernamePermission from "~/domain/entities/permission/ChangeUserUsernamePermission"
import Permission from "~/domain/entities/permission/Permission"
import Role from "~/domain/shared/role/Role"
import { userPermissions } from "~/domain/shared/role/UserRole"
import { URoles } from "~/domain/shared/role/types"

export default class ModeratorRole extends Role {
  name: URoles
  constructor() {
    super({
      permissions: moderatorPermissions,
    })
    this.name = "MODERATOR"
  }
}

export const moderatorPermissions: Permission[] = [
  new ChangeUserUsernamePermission({
    actionProhibitedOnRoles: ["ADMIN", "SUPER-ADMIN"],
  }),
]
