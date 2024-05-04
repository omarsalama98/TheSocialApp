import {User, fetchUserDetails, unknown_user} from './UsersHelper';

export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type UserPost = {
  id: number;
  user_id: number;
  title: string;
  body: string;
  user: User;
};

export const fetchPosts = async (page: number = 1, page_size: number = 20) => {
  const request_options = {
    method: 'GET',
  };

  return fetch(
    `https://gorest.co.in/public/v2/posts?page=${page}&per_page=${page_size}`,
    request_options,
  )
    .then(async (response: Response) => {
      if (response.status === 200) {
        return response.json().then(async (posts: Post[]) => {
          // Fetch the user details we're interested in, to add to the Post object
          const promises = posts.map(async post => {
            let updated_post: UserPost;
            return fetchUserDetails(post.user_id)
              .then(({data}) => {
                if (data !== undefined) {
                  updated_post = {
                    ...post,
                    user: data,
                  };
                  return updated_post;
                } else {
                  updated_post = {
                    ...post,
                    user: unknown_user,
                  };
                  return updated_post;
                }
              })
              .catch(err => {
                console.error(err);
                updated_post = {
                  ...post,
                  user: unknown_user,
                };
                return updated_post;
              });
          });
          return Promise.all(promises).then(updated_posts => {
            return {
              success: true,
              data: updated_posts,
              error: undefined,
            };
          });
        });
      } else {
        return response.text().then(text => {
          return {success: false, data: undefined, error: text};
        });
      }
    })
    .catch(error => {
      console.error(error);
      return {success: false, data: undefined, error: error};
    });
};
