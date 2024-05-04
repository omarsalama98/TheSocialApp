import React, {memo, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Post as PostType} from '../helpers/PostsHelper';
import {
  User,
  fetchUserDetails,
  getResourceFileName,
  unknown_user,
} from '../helpers/UsersHelper';
import {PostStyles} from '../styles/HomeScreenStyles';

const Post = (props: {post: PostType; navigation: any}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

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
  }, [props.post.user_id]);

  return user !== undefined ? (
    <TouchableOpacity
      style={PostStyles.container}
      disabled={props.navigation === undefined}
      onPress={() => {
        props.navigation.navigate('PostDetails', {
          post: props.post,
          user: user,
        });
      }}>
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
    </TouchableOpacity>
  ) : null;
};

export default memo(Post);
