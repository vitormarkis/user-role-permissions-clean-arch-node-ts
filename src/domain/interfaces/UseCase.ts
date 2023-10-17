import Permission from "~/domain/entities/permission/Permission"
import Role from "~/domain/shared/role/Role"

export abstract class UseCase {
  requiredPermissions: Permission[]

  constructor(props: UseCaseProps) {
    this.requiredPermissions = props.requiredPermissions
  }

  protected checkPermissions(mandantRole: Role, targetRole?: Role) {
    const isAllowed = this.requiredPermissions.every(useCaseRequiredPermission => {
      return mandantRole.permissions.some(mandantPermission => {
        const mandantHasPermission = mandantPermission instanceof useCaseRequiredPermission.constructor

        const allowedToPerformOnTarget = targetRole
          ? !mandantPermission.actionProhibitedOnRoles.includes(targetRole.name)
          : true

        return mandantHasPermission && allowedToPerformOnTarget
      })
    })

    return isAllowed
  }

  abstract execute(...args: any[]): any
}

type UseCaseProps = {
  requiredPermissions: Permission[]
}
