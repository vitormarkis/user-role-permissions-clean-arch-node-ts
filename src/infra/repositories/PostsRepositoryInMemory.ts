import Post from "~/domain/entities/post/Post"
import { PostsRepository } from "~/domain/repositories/PostsRepository"

export default class PostsRepositoryInMemory implements PostsRepository {
  posts: Post[] = []

  constructor() {}

  findAll(): Post[] {
    return this.posts
  }

  create(post: Post): void {
    this.posts.push(post)
  }
}
