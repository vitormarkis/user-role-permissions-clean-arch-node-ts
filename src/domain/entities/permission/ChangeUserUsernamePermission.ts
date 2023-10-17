import Permission, { PermissionProps } from "~/domain/entities/permission/Permission"

export default class ChangeUserUsernamePermission extends Permission {
  constructor(props: PermissionProps = {}) {
    super(props)
  }
}
