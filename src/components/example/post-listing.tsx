import { Component, State } from '@stencil/core';

import { Lift } from '../../services/lift.decorator';
import { Post, PostsService } from './posts.service';

@Lift({ key: 'post_listing' })
@Component({
  tag: 'post-listing',
  styleUrl: 'post-listing.css',
})
export class PostListing {

  @State() posts: Post[] = [];

  postsService: PostsService = new PostsService();

  async getInitialProps() { // args = { Lift: LiftService, isServer: boolean }
    const { data, error } = await this.postsService.getPosts();
    return { posts: data.slice(0, 20), error };
  }

  // If you make this function async, Stencil will wait till it returns to render it.
  // The decorator takes care of getting our data for us! So you don't *need* to define this..
  // but you can, if you need to do something else.
  // This will be called *after* your data is loaded by Lift, so that you have access to the
  // data that you loaded.
  // async componentWillLoad() { }

  render() {
    return [
      <header>
        <h1>All Posts</h1>
      </header>,

      <div class="post-list">
        {this.posts.map((p) => (
          <div class="post">
            <h3>{p.id}. {p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    ];
  }
}
