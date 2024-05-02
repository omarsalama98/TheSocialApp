import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {Post as PostType} from '../helpers/PostsHelper';
import {User, fetchUserDetails} from '../helpers/UsersHelper';
import {PostStyles} from '../styles/HomeScreenStyles';

export default function Post(props: {post: PostType}) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const unknown_user: User = {
    id: 0,
    name: 'Unknown User',
    email: 'unknown@e.co',
    gender: 'unknown',
    status: 'away',
  };

  const getResourceFileName = (cur_user: User) => {
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

  useEffect(() => {
    fetchUserDetails(props.post.user_id)
      .then(result => {
        if (result?.success === true && result.data !== undefined) {
          setUser(result.data);
        } else {
          setUser(unknown_user);
        }
      })
      .catch(() => {
        setUser(unknown_user);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.post.user_id]);

  return user !== undefined ? (
    <View style={PostStyles.container}>
      <View style={PostStyles.user_headline_container}>
        <Image
          source={getResourceFileName(user)}
          style={PostStyles.user_avatar}
        />
        <Text style={PostStyles.user_name}>{user?.name}</Text>
      </View>
      <View>
        <Text style={PostStyles.post_title}>{props.post.title}</Text>
        <Text style={PostStyles.post_body}>{props.post.body}</Text>
      </View>
    </View>
  ) : null;
}
