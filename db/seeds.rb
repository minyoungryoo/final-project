# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


mickey = User.create(name: "Mickey Mouse", email: "mickey@disney.com", password: "mickey", password_confirmation: "mickey")
minnie = User.create(name: "Minnie Mouse", email: "minnie@disney.com", password: "minnie", password_confirmation: "minnie")
goofy = User.create(name: "Goofy", email: "goofy@disney.com", password: "goofypw", password_confirmation: "goofypw") 
disneyland = User.create(name: "Disneyland", email: "dlandadmin@disney.com", password: "adminpw", 
	password_confirmation: "adminpw", role: "admin")





