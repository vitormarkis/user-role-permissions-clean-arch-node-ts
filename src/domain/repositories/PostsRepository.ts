import Post from "~/domain/entities/post/Post"

export interface PostsRepository {
  findAll(): Post[]
  create(post: Post): void
}
