import BanUserPermission from "~/domain/entities/permission/BanUserPermission"
import ChangeUserUsernamePermission from "~/domain/entities/permission/ChangeUserUsernamePermission"
import MakeUserAdminPermission from "~/domain/entities/permission/MakeUserAdminPermission"
import { adminPermissions } from "~/domain/shared/role/AdminRole"
import Role from "~/domain/shared/role/Role"
import { URoles } from "~/domain/shared/role/types"

export default class SuperAdminRole extends Role {
  name: URoles
  constructor() {
    super({
      permissions: superAdminPermissions,
    })
    this.name = "SUPER-ADMIN"
  }
}

export const superAdminPermissions = [
  ...adminPermissions,
  new BanUserPermission({
    actionProhibitedOnRoles: ["SUPER-ADMIN"],
  }),
  new MakeUserAdminPermission(),
  new ChangeUserUsernamePermission(),
]
