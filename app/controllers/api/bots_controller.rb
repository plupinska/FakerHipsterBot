class Api::BotsController < ApplicationController

  def index
    @tweets = Bot.all
    render :index
  end


  def create
    @tweet = Bot.make_poetry
    @tweet.save
    CLIENT.update(@tweet)
  end
end
