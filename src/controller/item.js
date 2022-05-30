const { item } = require('../../models')

const cloudinary = require('../utils/cloudinary');

exports.addItem = async (req, res) => {

    try {
        const { namabarang, hargabeli, hargajual, stock } = req.body;

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'merchandise-app',
            use_filename: true,
            unique_filename: true,
        });

        const createdItem = await item.create({
            image: result.public_id,
            namabarang,
            hargabeli,
            hargajual,
            stock
        })
        res.send({
            status: "success",
            data: {
                item: createdItem
            }
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: "Failed",
            message: "Name aready exist"
        })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        await item.destroy({
            where: {
                id,
            },
        });

        res.send({
            status: "success",
            data: {
                id: id,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.editItem = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const image = req.file.filename;

        await item.update({
            image: image,
            namabarang: newData.namabarang,
            hargabeli: newData.hargabeli,
            hargajual: newData.hargajual,
            stock: newData.stock,      
        }, { where: { id: id } });

        const update = await item.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })


        res.send({
            status: "success",
            data: {
                item: update
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.getItems = async (req, res) => {

    try {
        const items = await item.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                ...items,
                image: process.env.PATH_FILE + item.image,
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getItem = async (req, res) => {

    try {
        const { id } = req.params

        const getdata = await item.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                item: getdata
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}