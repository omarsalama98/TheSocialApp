import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {UserPost, fetchPosts} from './helpers/PostsHelper';
import Post from './components/Post';
import VerticalSeparator from './components/VerticalSeparator';
import {HomeStyles} from './styles/HomeScreenStyles';
import Loading from './components/Loading';

export default function HomeScreen({navigation}: any) {
  const [posts, setPosts] = useState<UserPost[] | undefined>(undefined);
  const [last_loaded_page, setLastLoadedPage] = useState<number>(1);
  const [on_scroll_end, setOnScrollEnd] = useState<boolean>(false);
  const [loading_next_page, setLoadingNextPage] = useState<boolean>(false);

  const loadNextPage = () => {
    fetchPosts(last_loaded_page + 1, 10).then(result => {
      if (result?.success && result.data !== undefined && posts !== undefined) {
        setLastLoadedPage(last_loaded_page + 1);
        const old_posts = [...posts];
        setPosts(old_posts.concat(result.data));
        setLoadingNextPage(false);
      }
    });
  };

  const renderFooter = () => {
    return loading_next_page ? (
      <View style={HomeStyles.loading_container}>
        <Loading />
      </View>
    ) : null;
  };

  useEffect(() => {
    fetchPosts().then(result => {
      if (result?.success && result.data !== undefined) {
        setPosts(result.data);
      }
    });
  }, []);

  return posts !== undefined ? (
    <SafeAreaView style={HomeStyles.container}>
      <FlatList
        data={posts}
        extraData={posts}
        keyExtractor={(_, index) => String(index)}
        renderItem={({item}) => <Post post={item} navigation={navigation} />}
        ItemSeparatorComponent={VerticalSeparator}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.3}
        onEndReached={(): void => {
          setOnScrollEnd(true);
        }}
        onMomentumScrollEnd={() => {
          if (on_scroll_end && !loading_next_page) {
            setLoadingNextPage(true);
            setTimeout(() => {
              loadNextPage();
            }, 500);
            setOnScrollEnd(false);
          }
        }}
      />
    </SafeAreaView>
  ) : (
    <Loading />
  );
}
