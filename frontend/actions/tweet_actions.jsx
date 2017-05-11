import * as TweetApiUtil from '../util/tweetUtil';
export const RECEIVE_TWEET = 'RECEIVE_TWEET';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';

export const receiveTweets = (tweets) => {
  return {
    type: RECEIVE_TWEETS,
    tweets
  };
};

export const receiveTweet = (tweet) => {
  return {
    type: RECEIVE_TWEET,
    tweet
  };
};


export const  fetchTweets = () => (dispatch) => {
  return TweetApiUtil.getTweets().then((tweets) => {
    dispatch(receiveTweets(tweets));
  });
};

export const makeTweet = () => (dispatch) => {
  return TweetApiUtil.makeTweet().then((tweet) => {
    dispatch(receiveTweet(tweet));
  });
};
