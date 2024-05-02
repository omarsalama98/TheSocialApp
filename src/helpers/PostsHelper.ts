export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
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
        return response.json().then((result: Post[]) => {
          return {
            success: true,
            data: result,
            error: undefined,
          };
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
