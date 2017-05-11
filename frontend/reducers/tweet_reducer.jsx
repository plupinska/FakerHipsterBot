import {RECEIVE_TWEET, RECEIVE_TWEETS} from '../actions/tweet_actions';

const tweetReducer = (state = {}, action) => {
  state.freeze;

  switch (action.type) {
    case RECEIVE_TWEETS:
      return action.tweets;
    case RECEIVE_TWEET:
      return action.tweet;
    default:
      return state;
  }
};

export default tweetReducer;
