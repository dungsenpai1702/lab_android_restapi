const express = require('express');

const router = express.Router();
const Distributors = require('../models/distributors');
const Fruits = require('../models/fruits');

// Api thêm distributor

router.get('/', async (req, res) => {
    res.send('Hello')
})

router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body

        const newDistributors = new Distributors({
            name: data.name,
        }); // Tạo một đối tượng mới

        const result = await newDistributors.save(); // Thêm vào database

        if (result) {
            // Nếu thêm thành công result Inull trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result,
            });
        } else {
            // Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data": [],
            });
        }
    } catch (error) {
        console.log("message: ", error);
    }
});


router.get('/get-list-distributor', async (req, res) => {
    try {
        const data = await Distributors.find().populate('name');
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data,
        });
    } catch (error) {
        console.log("message: ", error);
    }
});

router.get('/get-distributor-by-id/:id', async (req, res) => {
    try {
        const distributorId = req.params.id;
        const data = await Distributors.findById(distributorId).populate('name');
        res.json({
            "status": 200,
            "messenger": "Thông tin nhà phân phối",
            "data": data,
        });
    } catch (error) {
        console.log("message: ", error);
        res.status(500).json({ error: error.message });
    }
});

// UPDATE

router.put('/update-distributor-by-id/:id', async (req, res) => {

    try {

        const { id } = req.params

        const data = req.body; // Lấy dữ liệu từ body

        const updateDistributors = await Distributors.findById(id);

        let result = null;

        // if (updateFruit) {

        //     updateFruit.name = data.name ?? updateFruit.name;


        //     result = await updateFruit.save();
        // }
        if (updateDistributors) {
            updateDistributors.name = data.name;
            result = await updateDistributors.save();
        }

        // Thêm vào database

        if (result) {

            // Nếu thêm thành công result Inull trả về dữ liệu

            res.json({

                "status": 200,

                "messenger": "Cập nhật thành công",

                "data": result
            })
        } else {


            res.json([{
                "status": 400,
                "messenger": "Lỗi, Cập nhật không thành công",
                "data": []
            }])
        }

    } catch (error) {

        console.log("message: ", error);
    }
});



// fruits



// get fruits
router.get('/get-list-fruits', async (req, res) => {
    try {
        const data = await Fruits.find().populate('name');
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data,
        });
    } catch (error) {
        console.log("message: ", error);
    }
});

router.get('/get-fruit-by-id/:id', async (req, res) => {
    try {
        const distributorId = req.params.id;
        const data = await Fruits.findById(distributorId).populate('name');
        res.json({
            "status": 200,
            "messenger": "Thông tin nhà phân phối",
            "data": data,
        });
    } catch (error) {
        console.log("message: ", error);
        res.status(500).json({ error: error.message });
    }
});



// Api thêm fruit
router.post('/add-fruit', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body

        const newFruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            idDistributor: data.idDistributor,
        }); // Tạo một đối tượng mới

        const result = await newFruit.save(); // Thêm vào database

        if (result) {
            // Nếu thêm thành công result Inull trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result,
            });
        } else {
            // Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data": [],
            });
        }
    } catch (error) {
        console.log("message: ", error);
    }
});


// Api cập nhật fruit

router.put('/update-distributor-by-id/:id', async (req, res) => {

    try {

        const { id } = req.params

        const data = req.body; // Lấy dữ liệu từ body

        const updateFruit = await Fruits.findById(id)

        let result = null;

        if (updateFruit) {

            updateFruit.name = data.name ?? updateFruit.name;

            updateFruit.quantity = data.quantity ?? updateFruit.quantity,

                updateFruit.price = data.price ?? updateFruit.price,

                updateFruit.status = data.status ?? updateFruit.status,

                updateFruit.image = data.image ?? updateFruit.image,

                updateFruit.description = data.description ?? updateFruit.description,

                updateFruit.id_distributor = data.id_distributor ?? updateFruit.id_distributor

            result = await updateFruit.save();
        }

        // Tạo một đối tượng mới

        // Thêm vào database

        if (result) {

            // Nếu thêm thành công result Inull trả về dữ liệu

            res.json({

                "status": 200,

                "messenger": "Cập nhật thành công",

                "data": result
            })
        } else {

            // Nếu thêm không thành công result null, thông báo không thành công

            res.json([{
                "status": 400,
                "messenger": "Lỗi, Cập nhật không thành công",
                "data": []
            }])
        }

    } catch (error) {

        console.log("message: ", error);
    }
});


router.get('/getListByPrice', async (req, res) => {
    try {
        const { start, end } = req.query;
        const query = { price: { $gte: start, $lte: end } };
        console.log(query);
        const result = await Fruits.find(query, 'name price quatity id_distributor')
            .populate('id_distributor')
            .sort()
            .skip(0)
            .limit(2);
        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No fruit found within the given price range.',
                data: []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error.',
            error: error.message
        });
    }
});






module.exports = router;