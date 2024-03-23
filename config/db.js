const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const local = "mongodb://localhost:27017/MyDB";
const uri = "mongodb+srv://dungsenpai1702:IuFNjbah3tcGVqdC@dung.1bqe7nd.mongodb.net/?retryWrites=true&w=majority&appName=dung"

const connect = async () => {
    try {
        await mongoose.connect(uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log("Connect Success");
    } catch (error) {
        console.log("Lỗi connect: " + error);
        console.log("Connect failed");

    }
}

module.exports = { connect }