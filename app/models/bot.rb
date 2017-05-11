class Bot < ActiveRecord::Base

  def self.make_poetry
    poem = Faker::Hipster.sentence
  end

end
