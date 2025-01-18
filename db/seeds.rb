if Rails.env.development?
  ActiveRecord::Base.transaction do
    users = 10.times.map { FactoryBot.create(:user) }
    10.times.map do
      group = FactoryBot.build(:group)
      loop do
        break unless Group.where(name: group.name).exists?
        group.name = Faker::Book.genre
      end
      group.user_ids = Random.rand(10).times.map { users.sample.id }.uniq
      group.save
    end
  end
end
