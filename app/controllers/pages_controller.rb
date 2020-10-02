class PagesController < ApplicationController

    helper_method :logged_in?, :current_user
    require 'open_weather'
    
    def home
        @articles = Article.last(5)
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
