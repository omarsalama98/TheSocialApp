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
    .then((response: Response) => {
      if (response.status === 200) {
        response.json().then((result: Comment[]) => {
          return {
            success: true,
            data: result,
          };
        });
      } else {
        return response.text().then(text => {
          return {success: false, error: text};
        });
      }
    })
    .catch(error => {
      console.error(error);
      return {success: false, error: error};
    });
};
