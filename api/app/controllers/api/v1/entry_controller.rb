# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Api
  module V1
    class EntryController < ApplicationController
      before_action :authorize_request

      def initial_payload
        # campers
        campers = []
        html_as_s = URI.open('https://www.pronto2.com/icfc/bookingslist.php').read
        doc = Nokogiri::HTML(html_as_s)
        table = doc.css('tr')
        table.each do |table_row|
          camper = {
            name: table_row.css('td:nth-of-type(1)').text,
            arrival: table_row.css('td:nth-of-type(2)').text,
            departure: table_row.css('td:nth-of-type(3)').text
          }
          campers.append(camper)
        end

        # articles
        articles = Article.last(4).reverse

        # events
        nearest_sunday = Time.now.sunday.to_s
        last_sunday = Time.now.last_week.sunday.to_s

        events = Event.where(
          :start_time.to_s => last_sunday..nearest_sunday
        )

        render json: {
          inseason_reservation_link: ENV.fetch('INSEASON_RESERVATION_LINK', nil),
          outseason_reservation_link: ENV.fetch('OUTSEASON_RESERVATION_LINK', nil),
          campers:,
          articles:,
          events:
        }
      end
    end
  end
end
