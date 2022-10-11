require('dotenv').config();
const express = require('express');
const router = express.Router();
const DBschema = require('../DBschema/apiDbSchema');


//get all  
router.get('/', async (req, res) => {
    try{
        const sensors = await DBschema.find();
        res.json(sensors);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    //http://localhost:3000/route1
}); 

//get one
router.get('/:id', getSensors, (req, res) => {
    res.json(res.sensors);
    var dataValue = res.sensors.value;
    var nameDb = res.sensors.name;
    var dataId = req.params.id;
    var dataDate = res.sensors.update;

      
    let lastElement = dataDate[dataDate.length - 1];

    console.log(lastElement);
  
});

//create one  
router.post('/', async (req, res) => {
    var d = new Date();
    var dFormated = d.toLocaleString();
    const sensors = new DBschema({
        
        value: req.body.value, 
        update: dFormated
    })
    try{
        const newSensor = await sensors.save();
        res.status(201).json(newSensor);
        console.log(newSensor);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});


// Deleting One
router.delete('/:id', getSensors, async (req, res) => {
    try {
      await res.sensors.remove()
      res.json({ message: 'Device Deleted' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  async function getSensors(req, res, next) {
    let sensors
    try {
      sensors = await DBschema.findById(req.params.id)
      if (sensors == null) {
        return res.status(404).json({ message: 'Cannot find this ID' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.sensors = sensors
    next()
  }

 


module.exports = router