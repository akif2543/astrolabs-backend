const seeder = require("mongoose-seed");
const bcrypt = require("bcrypt");
require("dotenv").config();

const db = process.env.MONGO_URI;

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const users = [
  {
    model: "User",
    documents: [
      {
        firstName: "Mehdi",
        lastName: "Ali",
        handle: "mehdi",
        email: "mehdi@email.com",
        password: hashPassword("password"),
        photo: "https://i.imgur.com/eFVxDij.jpg",
      },
      {
        firstName: "Arif",
        lastName: "Khan",
        handle: "akhan",
        email: "arif@email.com",
        password: hashPassword("password"),
        photo: "https://i.imgur.com/olljGck.jpg",
      },
      {
        firstName: "Maria",
        lastName: "Fuentes",
        handle: "mfofficial",
        email: "mf@email.com",
        password: hashPassword("password"),
      },
      {
        firstName: "Margaret",
        lastName: "Engels",
        handle: "margsnengels",
        email: "margs@email.com",
        password: hashPassword("password"),
        photo: "https://i.imgur.com/evqtRLz.jpg",
      },
      {
        firstName: "Fred",
        lastName: "Saito",
        handle: "saitosan",
        email: "saito@email.com",
        password: hashPassword("password"),
        photo: "https://i.imgur.com/RMmQNK1.jpg",
      },
      {
        firstName: "Sara",
        lastName: "Walid",
        handle: "swali",
        email: "swalid@email.com",
        password: hashPassword("password"),
        photo: "https://i.imgur.com/DYOqeff.jpg",
      },
      {
        firstName: "Marie",
        lastName: "Coulombe",
        handle: "coulz",
        email: "marie@email.com",
        password: hashPassword("password"),
        photo: "https://i.imgur.com/lyhSZQT.jpg",
      },
      {
        firstName: "Zara",
        lastName: "Saeed",
        handle: "zsa",
        email: "zaras@email.com",
        password: hashPassword("password"),
        photo: "https://i.imgur.com/rIRKubf.jpg",
      },
      {
        firstName: "Anita",
        lastName: "Eveleigh",
        handle: "anitaevie",
        email: "anita@email.com",
        password: hashPassword("password"),
        photo: "https://i.imgur.com/xMagssJ.jpg",
      },
      {
        firstName: "Mohammed",
        lastName: "Masri",
        handle: "moma",
        email: "momasri@email.com",
        password: hashPassword("password"),
        photo: "https://i.imgur.com/Mb48vPd.jpg",
      },
      {
        firstName: "Jon",
        lastName: "Smith",
        handle: "braibru",
        email: "jsmith11@email.com",
        password: hashPassword("password"),
        photo: "https://i.imgur.com/36SlS9h.jpg",
      },
    ],
  },
];

seeder.connect(db, function () {
  seeder.loadModels(["../models/user.js"]);
  seeder.clearModels(["User"], function () {
    seeder.populateModels(users, function (err, done) {
      if (err) {
        return console.log("seed err", err);
      }
      if (done) {
        return console.log("seed done", done);
      }
      seeder.disconnect();
    });
  });
});
