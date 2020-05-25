const seeder = require("mongoose-seed");
require("dotenv").config();

const db = process.env.MONGO_URI;

const profiles = [
  {
    model: "Profile",
    documents: [
      {
        user: "5ecbdc97e7dad792e77442cb",
        location: "Dubai, UAE",
        occupation: "Marketing",
        bio:
          "Born in Delhi, but Dubai is home. I can make all kinds of traditional Indian dishes, and am hoping to learn all kinds of Middle Eastern cooking.",
        cuisine: "Indian",
        favoriteFood: "Shawarma",
      },
      {
        user: "5ecbdc97e7dad792e77442cc",
        location: "Dubai, UAE",
        cuisine: "Afghani",
      },
      {
        user: "5ecbdc97e7dad792e77442ce",
        location: "Dubai, UAE",
        occupation: "Developer",
        bio:
          "Full stack developer based in Dubai. Always on the hunt for new and interesting food!",
        cuisine: "German",
        favoriteFood: "Shiro and injera",
      },
      {
        user: "5ecbdc97e7dad792e77442cf",
        location: "Dubai, UAE",
        occupation: "Accountant",
        bio: "Hot pot enthusiast.",
        cuisine: "Japanese",
        favoriteFood: "Xiao Long Bao",
      },
      {
        user: "5ecbdc97e7dad792e77442d0",
        location: "Dubai, UAE",
        occupation: "Designer",
        bio:
          "I'm a fashion designer living in Dubai. Amman-born, London-educated, hungry for more!",
        cuisine: "Jordanian",
        favoriteFood: "Sushi, ceviche",
      },
      {
        user: "5ecbdc97e7dad792e77442d4",
        location: "Dubai, UAE",
        occupation: "Shurta",
        bio: "Mo' money, Mo Masri",
        cuisine: "Egyptian",
        favoriteFood: "Mandi",
      },
      {
        user: "5ecbdc97e7dad792e77442d1",
        location: "Dubai, UAE",
        occupation: "Air Traffic Controller",
        bio: "French-Canadian, Francophile & lover of all things Far Eastern.",
        cuisine: "French",
        favoriteFood: "Pad kee mao, som tum, laksa",
      },
      {
        user: "5ecbdc97e7dad792e77442d2",
        location: "Dubai, UAE",
        occupation: "Writer",
        bio:
          "Palestinian by way of Egypt, Lebanon, and the US. Rootless cosmopolitan.",
        cuisine: "Middle Eastern",
        favoriteFood: "Anything with zaatar",
      },
      {
        user: "5ecbdc97e7dad792e77442d3",
        location: "Absurdistan",
        occupation: "Business, none of your",
        bio: "No, thank you.",
        cuisine: "Lean",
        favoriteFood: "Baby Yoda",
      },
      {
        user: "5ecbdc97e7dad792e77442d5",
        location: "Dubai, UAE",
        occupation: "Developer",
        bio: "Aussie in Dubai, always on the prowl for interesting food.",
        cuisine: "Barbecue",
        favoriteFood: "Pho, bun cha",
      },
      {
        user: "5ecbdc97e7dad792e77442cd",
        location: "Dubai, UAE",
        occupation: "Air hostess",
        bio: "Livin', lovin', eatin'",
        cuisine: "Spanish",
        favoriteFood: "Falafel",
      },
    ],
  },
];

seeder.connect(db, function () {
  seeder.loadModels(["../models/profile.js"]);
  seeder.clearModels(["Profile"], function () {
    seeder.populateModels(profiles, function (err, done) {
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
