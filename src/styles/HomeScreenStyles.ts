import {StyleSheet} from 'react-native';

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 7,
  },
});

export const PostStyles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  user_headline_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user_avatar: {
    height: 40,
    width: 40,
    backgroundColor: '#FFEF00',
    borderRadius: 20,
  },
  user_name: {
    fontSize: 25,
    marginStart: 10,
  },
  post_title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  post_body: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10,
  },
});
