import BanUserPermission from "~/domain/entities/permission/BanUserPermission"
import Permission from "~/domain/entities/permission/Permission"
import SeeAllPostsPermission from "~/domain/entities/permission/SeeAllPostsPermission"
import { moderatorPermissions } from "~/domain/shared/role/ModeratorRole"
import Role from "~/domain/shared/role/Role"
import { URoles } from "~/domain/shared/role/types"

export default class AdminRole extends Role {
  name: URoles
  constructor() {
    super({
      permissions: adminPermissions,
    })
    this.name = "ADMIN"
  }
}

export const adminPermissions: Permission[] = [
  ...moderatorPermissions,
  new SeeAllPostsPermission(),
  new BanUserPermission({
    actionProhibitedOnRoles: ["SUPER-ADMIN"],
  }),
]
