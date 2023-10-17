import SeeAllPostsPermission from "~/domain/entities/permission/SeeAllPostsPermission"
import { UseCase } from "~/domain/interfaces/UseCase"
import { PostsRepository } from "~/domain/repositories/PostsRepository"
import Role from "~/domain/shared/role/Role"

export default class SeeAllPostsUseCase extends UseCase {
  constructor(private readonly postsRepository: PostsRepository) {
    super({
      requiredPermissions: [new SeeAllPostsPermission()],
    })
  }

  execute(role: Role) {
    const isAllowed = this.checkPermissions(role)
    if (!isAllowed) {
      throw new Error("User don't have permission to access this resource.")
    }

    const posts = this.postsRepository.findAll()

    return { posts }
  }
}
