const plants = [
    {
      name: "Snake Plant",
      category: null,
      imageSrc: "https://bustlingnest.com/wp-content/uploads/sansevieria-plant.jpg",
      description: "Snake plant is a species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo. It is most commonly known as the snake plant, Saint George's sword, mother-in-law's tongue, and viper's bowstring hemp, among other names.",
      light: "low",
      wateringWeekly: 7,
      petFriendly: false
    },
    {
      name: "Monstera Deliciosa",
      category: null,
      imageSrc: "https://images.squarespace-cdn.com/content/v1/5d8e4a46419b2528cc5d1c4d/1610818622664-EQNQNUZ9GKC8NKOT5UGA/monsteradeliciosa.jpg",
      description: "The monstera is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands.",
      light: "medium",
      wateringWeekly: null,
      petFriendly: true
    },
    {
      name: "Pothos",
      category: null,
      imageSrc: "https://www.gardeningknowhow.com/wp-content/uploads/2020/11/pothos-plant.jpg",
      description: "Pothos is a genus of flowering plants in the family Araceae (tribe Potheae). It is native to China, the Indian Subcontinent, Australia, New Guinea, Southeast Asia, and various islands of the Pacific and Indian Oceans.",
      light: "low",
      wateringWeekly: 4,
      petFriendly: false
    },
    {
      name: "Spider Plant",
      category: null,
      imageSrc: "https://cdn.shopify.com/s/files/1/1706/1307/products/Chlorophytum-Ocean-Spider-Plant-odile-moss-plant-pot-19cm.jpg",
      description: "Called spider plant due to its spider-like look, but also known as spider ivy and ribbon plant is a species of evergreen perennial flowering plant of the family Asparagaceae. It is native to tropical and southern Africa, but has become naturalized in other parts of the world, including western Australia.",
      light: "medium",
      wateringWeekly: 3,
      petFriendly: true
    },
    {
      name: "Money Tree",
      category: null,
      imageSrc: "https://m.media-amazon.com/images/I/61UPB3n+GiS._AC_SX425_.jpg",
      description: "It is a tropical wetland tree in the mallow family Malvaceae, native to Central and South America where it grows in swamps. It is known by its common names Malabar chestnut, French peanut, Guiana chestnut, Provision tree, Saba nut, Monguba (Brazil), Pumpo (Guatemala) and is commercially sold under the names Money tree and Money plant.",
      light: "high",
      wateringWeekly: 4,
      petFriendly: true
    },
    {
      name: "Parlor Palm",
      category: null,
      imageSrc: "https://cdn.shopify.com/s/files/1/0552/7535/6211/products/4_PALM_PARLOR_1.jpg",
      description: "Chamaedorea elegans, the neanthe bella palm or parlour palm, is a species of small palm tree native to the rainforests in Southern Mexico and Guatemala. The parlor palm is one of the most heavily sold houseplant palms in the world. It is one of several species with leaves that are harvested as xate.",
      light: "low",
      wateringWeekly: 7,
      petFriendly: true
    },
    {
      name: "Boston Fern",
      category: null,
      imageSrc: "https://indoorhomegarden.com/wp-content/uploads/2021/11/How-Often-Should-You-Water-Ferns.jpg",
      description: "Boston fern is a common ornamental plant frequently grown as a houseplant in cold climates. The species Nephrolepis exaltata is a tropical species of sword fern (in the family Lomariopsidaceae), native to humid forests from northern South America through Mexico, in Florida and the West Indies where it can grow up to 7 feet tall.",
      light: "low",
      wateringWeekly: 4,
      petFriendly: true
    },
    {
      name: "Weeping Fig",
      category: null,
      imageSrc: "https://www.cowellsgc.co.uk/files/images/webshop/weeping-fig-130-cm-600x600-61f34300925e2_l.webp",
      description: "Weeping ficus or fig (Ficus benjamina) is popular as houseplants, in offices and interior landscaping. They have an elegant form and dense, glossy dark foliage. Slender branches arch gracefully from a light gray trunk. These small indoor trees are generally easy to grow if given enough light and proper care.",
      light: "high",
      wateringWeekly: 3,
      petFriendly: false
    },
    {
      name: "Philodendron Imperial",
      category: null,
      imageSrc: "https://www.floragard.de/Content/files/26472/Philodendron-scandens-Imperial-Green-1200x630-proportionalbiggest.webp",
      description: "The philodendron imperial green is an upright-growing variety with a striking appearance. It gets its name from its smooth, glossy green leaves. The large leaves fan out in all directions making it an attractive foliage plant for your home. This philodendron variety is also exceptional at purifying the air in your space.",
      light: "high",
      wateringWeekly: 5,
      petFriendly: false
    },
    {
      name: "Caladium",
      category: null,
      imageSrc: "https://i.pinimg.com/originals/33/61/e1/3361e10310204ea6cc7fbd569e21c719.jpg",
      description: "Caladiums are known for their big, heart-shaped leaves that display amazing color combinations of white, pink, red and green. These are tropical plants that thrive in hot, humid weather. Caladiums rarely flower, but the beautiful foliage guarantees a colorful show wherever they are planted -- beneath trees, between shrubs, in perennial borders and in containers.",
      light: "medium",
      wateringWeekly: 7,
      petFriendly: false
    }
  ]

const mongoose = require("mongoose");

const Plant = require("../models/Plant.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/ironhack-backend-project";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    return Plant.insertMany(plants);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  })
  .finally(() => {
    console.log("closing the database")
    mongoose.connection.close();
});