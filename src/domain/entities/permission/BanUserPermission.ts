import Permission, { PermissionProps } from "~/domain/entities/permission/Permission"

export default class BanUserPermission extends Permission {
  constructor(props: PermissionProps = {}) {
    super(props)
  }
}
