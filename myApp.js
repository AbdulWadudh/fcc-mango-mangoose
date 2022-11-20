require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age : {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});

const Person  = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const document = new Person({name: "John", age: 25, favoriteFoods: ["Noodles", "Pasta"]});
  document.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

const createManyPeople = async (arrayOfPeople, done) => {
  const data = await Person.create(arrayOfPeople);
  done(null, data);
  
};

const findPeopleByName = async (personName, done) => {
  const data = await Person.find({name: personName});
  done(null, data);
};

const findOneByFood = async (food, done) => {
  const data = await Person.findOne({favoriteFoods: food});
  done(null, data);
};

const findPersonById = async (personId, done) => {
  const data = await Person.findById({_id: personId});
  done(null, data);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) console.log(err);

    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if (err) console.log(err);

      done(null, data)
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if (err) console.log(err);

    done(null, data)
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) console.log();

    done(null, data)
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) console.log(err);

    done(null, data)
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person
    .find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age : 0})
    .exec((err, data) => {
      if (err) console.log(err);
      console.log("data", data)

      done(err, data)
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
