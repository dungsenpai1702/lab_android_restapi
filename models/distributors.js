const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Distributors = new Schema({
    name: { type: String, required: true, }
}, {
    timestamps: true
}
);

// Tự động cập nhật thời gian tạo và cập nhật
// Distributors.set("timestamps", true);

module.exports = mongoose.model("distributor", Distributors);
