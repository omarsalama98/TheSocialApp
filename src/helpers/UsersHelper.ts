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

export const unknown_user: User = {
  id: 0,
  name: 'Unknown User',
  email: 'unknown@e.co',
  gender: 'unknown',
  status: 'away',
};

export const getResourceFileName = (cur_user: User) => {
  if (cur_user.gender === 'male') {
    if (cur_user.id % 2 === 0) {
      return require('../assets/male_1.png');
    } else {
      return require('../assets/male_2.png');
    }
  } else if (cur_user.gender === 'female') {
    if (cur_user.id % 2 === 0) {
      return require('../assets/female_1.png');
    } else {
      return require('../assets/female_2.png');
    }
  } else {
    return require('../assets/unknown.png');
  }
};

export const getRandomResourceFileName = () => {
  const random_int = Math.floor(Math.random() * 4);
  switch (random_int) {
    case 0:
      return require('../assets/male_1.png');
    case 1:
      return require('../assets/male_2.png');
    case 2:
      return require('../assets/female_1.png');
    case 3:
      return require('../assets/female_2.png');
    default:
      return require('../assets/unknown.png');
  }
};
