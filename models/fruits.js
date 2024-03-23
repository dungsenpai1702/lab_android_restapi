
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Fruits = new Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    status: {
        type: Number, // trạng thái = 1 => Còn hàng, 0 => Hết hàng, -1 => Ngừng kinh doanh
    },
    image: {
        type: Array, // Kiểu dữ liệu danh sách
    },
    description: {
        type: String,
    },
    id_distributor: {
        type: Schema.Types.ObjectId,
        ref: 'distributor',
    },
});

// Tự động cập nhật thời gian tạo và cập nhật
Fruits.set('timestamps', true);

module.exports = mongoose.model('fruit', Fruits);

// Ghi chú:

// * `type: Schema.Types.ObjectId` => Kiểu dữ liệu id của mongodb
// * `ref: 'distributor'` => Khóa ngoại
