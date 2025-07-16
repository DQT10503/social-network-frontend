import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Post, Comment } from '../../models/post.interface';

interface PostState {
  posts: Post[];
  comments: { [postId: string]: Comment[] };
  loading: boolean;
  error: any;
}

const initialState: PostState = {
  posts: [],
  comments: {},
  loading: false,
  error: null
};

export const PostStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ posts, comments }) => ({
    postCount: computed(() => posts().length),
    hasPosts: computed(() => posts().length > 0)
  })),
  withMethods((store) => ({
    setPosts(posts: Post[]) {
      patchState(store, { posts });
    },
    addPost(post: Post) {
      patchState(store, { posts: [...store.posts(), post] });
    },
    updatePost(postId: string, post: Partial<Post>) {
      patchState(store, {
        posts: store.posts().map(p => p.id === postId ? { ...p, ...post } : p)
      });
    },
    deletePost(postId: string) {
      patchState(store, {
        posts: store.posts().filter(p => p.id !== postId)
      });
    },
    setComments(postId: string, comments: Comment[]) {
      patchState(store, {
        comments: { ...store.comments(), [postId]: comments }
      });
    },
    addComment(postId: string, comment: Comment) {
      const currentComments = store.comments()[postId] || [];
      patchState(store, {
        comments: { ...store.comments(), [postId]: [...currentComments, comment] }
      });
    },
    setLoading(loading: boolean) {
      patchState(store, { loading });
    },
    setError(error: any) {
      patchState(store, { error });
    }
  }))
);

export type PostStore = InstanceType<typeof PostStore>; 