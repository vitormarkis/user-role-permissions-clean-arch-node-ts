import { URoles } from "~/domain/shared/role/types"

export type PermissionProps = {
  actionProhibitedOnRoles?: URoles[]
}

export default abstract class Permission {
  actionProhibitedOnRoles: URoles[] = []

  constructor(props: PermissionProps = {}) {
    if (props.actionProhibitedOnRoles) this.actionProhibitedOnRoles = props.actionProhibitedOnRoles
  }
}
