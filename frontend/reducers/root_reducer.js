import {combineReducers} from 'redux';
import tweetReducer from './tweet_reducer';

const RootReducer = combineReducers({
  tweets: tweetReducer
});
