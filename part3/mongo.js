const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = 
`mongodb+srv://lilian:${password}@cluster0.mom0v.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(people => {
        console.log('phonebook:')
        people.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close() 
    })
    
} else if (process.argv.length === 5) {
    const person = new Person({
        name: newName,
        number: newNumber,
    })

    person.save().then(result => {
        //console.log(result)
        console.log(`added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close()
    })
} else {
    mongoose.connection.close()
}


