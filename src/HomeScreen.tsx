import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {Post as PostType, fetchPosts} from './helpers/PostsHelper';
import Post from './components/Post';
import VerticalSeparator from './components/VerticalSeparator';
import {HomeStyles} from './styles/HomeScreenStyles';
import Loading from './components/Loading';

export default function HomeScreen({navigation}: any) {
  const [posts, setPosts] = useState<PostType[] | undefined>(undefined);

  useEffect(() => {
    fetchPosts().then(result => {
      if (result?.success && result.data !== undefined) {
        setPosts(result.data);
      }
    });
  });

  return posts !== undefined ? (
    <SafeAreaView style={HomeStyles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} navigation={navigation} />}
        ItemSeparatorComponent={VerticalSeparator}
      />
    </SafeAreaView>
  ) : (
    <Loading />
  );
}
