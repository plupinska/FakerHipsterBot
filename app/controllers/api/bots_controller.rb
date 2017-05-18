class Api::BotsController < ApplicationController

  def index
    @tweets = Bot.all
    render :index
  end


  def create
    @tweet = "Human #{params["humanLives"]}, AI #{params["aiLives"]}" +  " " + Faker::Hipster.words(2).join(' ')
    Bot.create(tweet: @tweet)
    CLIENT.update(@tweet)
    render :show
  end

  def game_params
    params.permit(:aiLives, :humanLives)
  end
end
