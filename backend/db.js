const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://LittleHearts:littleHearts123@cluster0.95z5wwy.mongodb.net/LittleHearstMern?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database");

        const fetched_data = await mongoose.connection.db.collection("Products").find({}).toArray();
        const fetched_catData = await mongoose.connection.db.collection("category").find({}).toArray();

        global.Products = fetched_data;
        global.category = fetched_catData;
        
    } catch (err) {
        console.error(err);
    }
}

module.exports = mongoDB;
