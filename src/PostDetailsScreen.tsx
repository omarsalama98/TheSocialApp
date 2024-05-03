import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import Comment from './components/Comment';
import VerticalSeparator from './components/VerticalSeparator';
import {
  Comment as CommentType,
  fetchPostComments,
} from './helpers/CommentsHelper';
import {PostDetailsStyles} from './styles/PostDetailsScreenStyles';
import {Post as PostType} from './helpers/PostsHelper';
import Loading from './components/Loading';
import {User} from './helpers/UsersHelper';
import PostDetail from './components/PostDetail';

export default function PostDetailsScreen({route}: any) {
  const post: PostType = route.params.post;
  const user: User = route.params.user;
  const [comments, setComments] = useState<CommentType[]>();

  useEffect(() => {
    fetchPostComments(post.id).then(result => {
      if (result.success && result.data !== undefined) {
        setComments(result.data);
      }
    });
  }, [post]);

  return (
    <SafeAreaView style={PostDetailsStyles.container}>
      <PostDetail post={post} user={user} />
      <View style={PostDetailsStyles.separator} />
      {comments !== undefined ? (
        comments.length === 0 ? (
          <Text style={PostDetailsStyles.no_comments}>No Comments</Text>
        ) : (
          <FlatList
            data={comments}
            renderItem={({item}) => <Comment comment={item} />}
            ItemSeparatorComponent={VerticalSeparator}
          />
        )
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
}
