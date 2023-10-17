import ChangeUserUsernamePermission from "~/domain/entities/permission/ChangeUserUsernamePermission"
import Permission from "~/domain/entities/permission/Permission"
import SeeAllPostsPermission from "~/domain/entities/permission/SeeAllPostsPermission"
import Role from "~/domain/shared/role/Role"
import { URoles } from "~/domain/shared/role/types"

export default class UserRole extends Role {
  name: URoles
  constructor() {
    super({
      permissions: userPermissions,
    })
    this.name = "USER"
  }
}

export const userPermissions: Permission[] = [
  new SeeAllPostsPermission(),
  new ChangeUserUsernamePermission({
    actionProhibitedOnRoles: ["MODERATOR"],
  }),
]
