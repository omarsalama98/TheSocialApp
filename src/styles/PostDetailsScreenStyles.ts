import {StyleSheet} from 'react-native';

export const PostDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: '2%',
  },
  no_comments: {
    alignSelf: 'center',
    fontSize: 17,
    color: '#7F7F7F',
  },
});

export const CommentStyles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
  },
  avatar_container: {
    width: '15%',
  },
  user_avatar: {
    height: 40,
    width: 40,
    backgroundColor: '#FFEF00',
    borderRadius: 20,
  },
  comment_content: {
    padding: 10,
    backgroundColor: '#D0E0E0',
    borderRadius: 10,
    width: '85%',
  },
  user_name: {
    fontSize: 17,
    fontWeight: '500',
  },
  comment_body: {
    fontSize: 17,
    fontWeight: '300',
    marginTop: 10,
  },
});
