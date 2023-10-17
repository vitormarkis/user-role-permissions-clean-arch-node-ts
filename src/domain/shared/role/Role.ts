import Permission from "~/domain/entities/permission/Permission"
import { URoles } from "~/domain/shared/role/types"

export default abstract class Role {
  permissions: Permission[]

  constructor(props: RoleProps) {
    this.permissions = props.permissions
  }

  abstract name: URoles
}

export type RoleProps = {
  permissions: Permission[]
}
