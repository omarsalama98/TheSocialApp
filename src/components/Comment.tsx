import React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {Comment as CommentType} from '../helpers/CommentsHelper';
import {getRandomResourceFileName} from '../helpers/UsersHelper';
import {CommentStyles} from '../styles/PostDetailsScreenStyles';

export default function Comment(props: {comment: CommentType}) {
  return props.comment !== undefined ? (
    <View style={CommentStyles.container}>
      <View style={CommentStyles.avatar_container}>
        <Image
          source={getRandomResourceFileName()}
          style={CommentStyles.user_avatar}
        />
      </View>
      <View style={CommentStyles.comment_content}>
        <Text style={CommentStyles.user_name}>{props.comment.name}</Text>
        <Text style={CommentStyles.comment_body}>{props.comment.body}</Text>
      </View>
    </View>
  ) : (
    <ActivityIndicator />
  );
}
