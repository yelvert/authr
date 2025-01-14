FactoryBot.define do
  factory :application do
    name { Faker::App.name }
    hostnames { Faker::Number.within(range: 1..5).map { Faker::Internet.domain_name } }

    trait :from_docker do
      source { :docker }
    end
  end
end
