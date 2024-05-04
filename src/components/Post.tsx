import React, {memo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {UserPost} from '../helpers/PostsHelper';
import {getResourceFileName} from '../helpers/UsersHelper';
import {PostStyles} from '../styles/HomeScreenStyles';

const Post = (props: {post: UserPost; navigation: any}) => {
  return (
    <TouchableOpacity
      style={PostStyles.container}
      disabled={props.navigation === undefined}
      onPress={() => {
        props.navigation.navigate('PostDetails', {
          post: props.post,
        });
      }}>
      <View style={PostStyles.user_headline_container}>
        <Image
          source={getResourceFileName(props.post.user)}
          style={PostStyles.user_avatar}
        />
        <Text style={PostStyles.user_name}>{props.post.user.name}</Text>
      </View>
      <View>
        <Text style={PostStyles.post_title}>{props.post.title}</Text>
        <Text style={PostStyles.post_body}>{props.post.body}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Post);
