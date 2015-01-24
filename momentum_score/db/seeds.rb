require 'faker'
1000.times do 
  amount = rand(500)*100000
  Startup.create(fundraised: amount, name: Faker::Company.name)
end