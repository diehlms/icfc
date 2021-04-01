class PagesController < ApplicationController

    helper_method :logged_in?, :current_user
    require 'open_weather'
    
    def home
        @articles = Article.last(4).reverse
        @inseason_res_link = ENV['INSEASON_RESERVATION_LINK']
        @outseason_res_link = ENV['OUTSEASON_RESERVATION_LINK']
    end

    def forms
    end

    def history
    end

    def bylaws
    end

    def membership
    end

    def customs
    end

    def charitable_gift
    end

    def familyagreements
    end

    def planned_giving
    end

    def archives
    end

    def committee_primer 
    end
end
