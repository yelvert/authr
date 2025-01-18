FactoryBot.define do
  factory :application do
    name { Faker::App.name }
    hostnames { Faker::Number.within(range: 1..5).map { Faker::Internet.domain_name } }
    active { Faker::Boolean.boolean }
    source { [ "custom", "docker" ][Faker::Number.within(0..1)] }

    trait(:active) { active { true } }
    trait(:inactive) { active { false } }

    trait(:custom) { source { "custom" } }
    trait(:docker) { source { "docker" } }
  end
end
