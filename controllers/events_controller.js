const events = require('express').Router();
const db = require('../models');
const { Event } = db;
const { Op } = require('sequelize')

// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})



//* GET ONE EVENT
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch(e) {
        res.status(500).json(e)
    }
})

//Create Event
events.post('/', async (req, res) =>{
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json(newEvent)
    }catch(err) {
        res.status(500).json(e)
    }
})

// UPDATE AN EVENT
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Updated ${updatedEvents} events(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//* DELETE EVENT
events.delete('/:id', async (req, res) => {
	try {
		const deletedEvents = await Event.destroy({
			where: { event_id: req.params.id },
		});
		res.status(200).json({
			message: `Deleted ${deletedEvents} event(s)`,
		});
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = events;