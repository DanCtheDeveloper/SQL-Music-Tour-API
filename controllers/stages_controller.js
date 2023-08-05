const stages = require('express').Router();
const db = require('../models');
const { Stage } = db;
const { Op } = require('sequelize')

// FIND ALL BANDS
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [ [ 'name', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})



//* GET ONE STAGE
stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch(e) {
        res.status(500).json(e)
    }
})

//Create Band
stages.post('/', async (req, res) =>{
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json(newStage)
    }catch(err) {
        res.status(500).json(e)
    }
})

// UPDATE A BAND
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//* DELETE BAND
stages.delete('/:id', async (req, res) => {
	try {
		const deletedStages = await Stage.destroy({
			where: { stage_id: req.params.id },
		});
		res.status(200).json({
			message: `Deleted ${deletedStages} stage(s)`,
		});
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = stages;