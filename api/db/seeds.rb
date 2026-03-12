# frozen_string_literal: true

require "faker"

puts "Clearing existing data..."
Comment.delete_all
Article.delete_all
CabinAttachment.delete_all
Cabindate.delete_all
Cabin.delete_all
Gallery.delete_all
Event.delete_all
Rideshare.delete_all
LocationPoint.delete_all
FamilyMember.delete_all
FamilyTree.delete_all
Committee.delete_all
CampMessage.delete_all
Document.delete_all
Chart.delete_all
User.delete_all

puts "Creating users..."

admin = User.create!(
  username: "adminuser",
  firstname: "Admin",
  lastname: "User",
  email: "admin@example.com",
  password: "Password123!",
  password_confirmation: "Password123!",

  
  admin: true,
  verified: true,
  email_confirmed: true
)

users = 8.times.map do |i|
  User.create!(
    username: Faker::Internet.unique.username(specifier: 8..10),
    firstname: Faker::Name.first_name,
    lastname: Faker::Name.last_name,
    email: Faker::Internet.unique.email,
    password: "Password123!",
    password_confirmation: "Password123!",
    phone_number: Faker::PhoneNumber.cell_phone,
    verified: [true, true, false].sample,
    email_confirmed: true
  )
end

all_users = [admin] + users

puts "Creating articles and comments..."

10.times do
  article = Article.create!(
    title: Faker::Lorem.sentence(word_count: 4).chomp("."),
    content: Faker::Lorem.paragraphs(number: 3).join("\n\n"),
    user: all_users.sample,
    pinned: [false, false, false, true].sample
  )

  rand(1..5).times do
    Comment.create!(
      content: Faker::Lorem.sentence(word_count: rand(8..20)),
      user: all_users.sample,
      article: article
    )
  end
end

puts "Creating cabins..."

5.times do
  cabin = Cabin.create!(
    name: "#{Faker::Address.city} Cabin",
    bedrooms: rand(1..6).to_s,
    user: all_users.sample,
    washerdryer: [true, false].sample,
    dock: [true, false].sample,
    description: Faker::Lorem.paragraph(sentence_count: 2),
    price_per_week: [500, 750, 1000, 1200, 1500].sample,
    price_per_day: [100, 150, 200, 250].sample
  )

  rand(2..5).times do
    start_date = Faker::Date.between(from: Date.today, to: Date.today + 180)
    Cabindate.create!(
      cabin: cabin,
      startdate: start_date,
      enddate: start_date + rand(3..14)
    )
  end
end

puts "Creating events..."

12.times do
  start_time = Faker::Time.between(from: Date.today, to: Date.today + 365)
  Event.create!(
    title: Faker::Lorem.sentence(word_count: 3).chomp("."),
    location: Faker::Address.city,
    description: Faker::Lorem.sentence(word_count: 12),
    start_time: start_time,
    end_time: start_time + rand(1..5).hours,
    user: all_users.sample,
    all_day: [true, false].sample
  )
end

puts "Creating location points and rideshares..."

locations = [
  { name: "North Gate", description: "Main north entrance" },
  { name: "South Lot", description: "South parking area" },
  { name: "Downtown", description: "City center meetup point" },
  { name: "Airport", description: "Terminal B arrivals" },
  { name: "Train Station", description: "Main platform" },
].map { |attrs| LocationPoint.create!(location_name: attrs[:name], location_description: attrs[:description]) }

8.times do
  departure, arrival = locations.sample(2)
  depart_time = Faker::Time.between(from: Date.today, to: Date.today + 60)
  Rideshare.create!(
    departing_at: depart_time,
    arriving_at: depart_time + rand(1..4).hours,
    number_of_passengers: rand(1..4),
    additional_information: Faker::Lorem.sentence,
    point_of_departure: departure,
    point_of_arrival: arrival,
    user_id: all_users.sample.id.to_s,
    seeking: [true, false].sample
  )
end

puts "Creating family trees and members..."

3.times do |i|
  tree = FamilyTree.create!(
    name: "#{Faker::Name.last_name} Family",
    user: all_users.sample
  )

  tree_user = all_users.sample

  grandpa = FamilyMember.create!(
    name: Faker::Name.male_first_name + " " + Faker::Name.last_name,
    relationship: :father,
    date_of_birth: Faker::Date.birthday(min_age: 70, max_age: 90),
    family_tree: tree,
    user_id: tree_user.id
  )

  grandma = FamilyMember.create!(
    name: Faker::Name.female_first_name + " " + Faker::Name.last_name,
    relationship: :mother,
    date_of_birth: Faker::Date.birthday(min_age: 65, max_age: 85),
    family_tree: tree,
    user_id: tree_user.id
  )

  2.times do
    parent = FamilyMember.create!(
      name: Faker::Name.name,
      relationship: [:father, :mother].sample,
      date_of_birth: Faker::Date.birthday(min_age: 40, max_age: 60),
      family_tree: tree,
      parent_ids: [grandpa.id, grandma.id],
      user_id: tree_user.id
    )

    rand(1..3).times do
      FamilyMember.create!(
        name: Faker::Name.name,
        relationship: [:son, :daughter].sample,
        date_of_birth: Faker::Date.birthday(min_age: 10, max_age: 35),
        family_tree: tree,
        parent_ids: [parent.id],
        user_id: tree_user.id
      )
    end
  end
end

puts "Creating committees..."

[
  { name: "Events Committee", url: "https://example.com/events" },
  { name: "Grounds Committee", url: "https://example.com/grounds" },
  { name: "Finance Committee", url: "https://example.com/finance" },
  { name: "Social Committee", url: "https://example.com/social" },
].each { |attrs| Committee.create!(attrs) }

puts "Creating camp messages..."

5.times do
  CampMessage.create!(
    message: Faker::Lorem.sentence(word_count: rand(6..15)),
    expired: [false, false, true].sample
  )
end

puts "Done! Seeded:"
puts "  #{User.count} users"
puts "  #{Article.count} articles"
puts "  #{Comment.count} comments"
puts "  #{Cabin.count} cabins"
puts "  #{Cabindate.count} cabin dates"
puts "  #{Event.count} events"
puts "  #{LocationPoint.count} location points"
puts "  #{Rideshare.count} rideshares"
puts "  #{FamilyTree.count} family trees"
puts "  #{FamilyMember.count} family members"
puts "  #{Committee.count} committees"
puts "  #{CampMessage.count} camp messages"
