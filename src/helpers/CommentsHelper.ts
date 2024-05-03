export type Comment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

export const fetchPostComments = async (post_id: number) => {
  const request_options = {
    method: 'GET',
  };

  return fetch(
    `https://gorest.co.in/public/v2/posts/${post_id}/comments`,
    request_options,
  )
    .then(async (response: Response) => {
      if (response.status === 200) {
        return response.json().then((result: Comment[]) => {
          return {
            success: true,
            data: result,
            error: undefined,
          };
        });
      } else {
        return response
          .text()
          .then(text => {
            return {success: false, data: undefined, error: text};
          })
          .catch(error => {
            return {success: false, data: undefined, error: error};
          });
      }
    })
    .catch(error => {
      console.error(error);
      return {success: false, data: undefined, error: error};
    });
};
