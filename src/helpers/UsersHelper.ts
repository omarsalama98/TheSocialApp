export type User = {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female' | 'unknown';
  status: 'active' | 'inactive' | 'away';
};

export const fetchUserDetails = async (user_id: number) => {
  const request_options = {
    method: 'GET',
  };

  return fetch(
    `https://gorest.co.in/public/v2/users/${user_id}`,
    request_options,
  )
    .then(async (response: Response) => {
      if (response.status === 200) {
        return response.json().then((result: User) => {
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
