import React from 'react';
import {Image, Text, View} from 'react-native';
import {UserPost} from '../helpers/PostsHelper';
import {getResourceFileName} from '../helpers/UsersHelper';
import {PostStyles} from '../styles/HomeScreenStyles';

export default function PostDetail(props: {post: UserPost}) {
  const {post} = props;
  const user = post.user;

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
        <Text style={PostStyles.post_title}>{post.title}</Text>
        <Text style={PostStyles.post_body}>{post.body}</Text>
      </View>
    </View>
  ) : null;
}
