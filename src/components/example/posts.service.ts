import { DataService } from './data.service';

export interface Post {
  userId: string | number;
  id: number;
  title: string;
  body: string;
}

export class PostsService extends DataService {

  private _id = Math.floor(Math.random() * 10000 + 1000);

  get ID() {
    return this._id;
  }

  async getPosts(): Promise<{ data?: Post[], error?: Error }> {
    return this.get('https://jsonplaceholder.typicode.com/posts');
  }

  async getPost(postId: string) {
    return this.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }

  async getComments(postId: string) {
    return this.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  }

}
