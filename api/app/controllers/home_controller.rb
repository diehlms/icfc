# typed: true
# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

class HomeController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!

  def index
    @events = Event.where(start_time: Time.now.last_week.sunday..Time.now.sunday)
    @articles = Article.last(4).reverse
    @campers = fetch_campers
  end

  private

  sig { returns(T::Array[T::Hash[Symbol, String]]) }
  def fetch_campers
    html = URI.open('https://www.pronto2.com/icfc/bookingslist.php').read
    doc = Nokogiri::HTML(html)
    current_date = Date.today
    doc.css('tr').filter_map do |row|
      arrival = row.css('td:nth-of-type(2)').text
      departure = row.css('td:nth-of-type(3)').text
      next if arrival.blank? || departure.blank?

      arrival_date = Date.parse(arrival) rescue nil
      departure_date = Date.parse(departure) rescue nil
      next unless arrival_date && departure_date
      next unless arrival_date <= current_date && departure_date >= current_date

      { name: row.css('td:nth-of-type(1)').text, arrival:, departure: }
    end
  rescue StandardError
    []
  end
end
