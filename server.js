const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION , SHUTTING DOWN...");
  console.log("ERROR__>", err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

// dotenv.config();
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
const localDB = process.env.DATABASE_LOCAL;
console.log("db-->", DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("");
  });

//TEST

// const connectDB = async () => {
//   try {
//     await mongoose.connect(DB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false
//     });
//     console.log('DB connection is successfull !');
//     // Create and save a tour after the DB connection is successful
//     const testTour = new Tour({
//       name: 'The Forest Hiker',
//       rating: 4.7,
//       price: 985
//     });
//     await testTour.save();
//     console.log('Tour saved:', testTour);
//   } catch (err) {
//     console.error('Error:', err.message);
//   }
// };

// connectDB();

// Use CORS middleware
app.use(cors());

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION , SHUTTING DOWN...");
  console.log("2ERROR__>", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
