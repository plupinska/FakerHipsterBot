export const makeTweet = () => {
  return $.ajax({
    method: 'POST',
    url: `/api/bots`
  });
};

export const getTweets = () => {
  return $.ajaz({
    method: 'GET',
    url: `api/bots`
  });
};
