class Api::V1::EntryController < ApplicationController
    before_action :require_user
    helper_method :current_user, :logged_in?, :require_user

    def initial_payload
        render json: {
            inseason_reservation_link: ENV['INSEASON_RESERVATION_LINK'],
            outseason_reservation_link: ENV['OUTSEASON_RESERVATION_LINK'],
            logged_in: !!current_user
        }
    end

    def weather
        options = { units: "metric", APPID: "7b926685adb5adb5cbd8dcdf38b63587" }
        mactier_weather = OpenWeather::Current.geocode(45.34, -80.04, options)
        
        render json: { 
            humidity: mactier_weather["main"]["humidity"],
            max_temp: mactier_weather["main"]["temp_max"].floor,
            wind_speed: mactier_weather["wind"]["speed"],
        }
    end

    def campers
        @campers = []
        render json: {
            campers: @campers
        }
    end

    def recent_articles
        @articles = Article.last(4).reverse
        render json: {
            articles: @articles
        }
    end
end