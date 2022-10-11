require('dotenv').config();
const express = require('express');
const router = express.Router();
const DBschema = require('../DBschema/apiDbSchema');

//get all 
router.get('/', async (req, res) => {
    try{
        const sensors = await DBschema.find();
        res.json(sensors);
        console.log(sensors);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    //http://localhost:3000/route1
}); 

//get one
router.get('/:id', getSensors, (req, res) => {
    res.json(res.sensors);
    var dataValue = res.sensors.value
    var nameDb = res.sensors.name
    var dataId = req.params.id
    console.log('The device ', nameDb, 'has been reached ID= ', dataId)   
  
});
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



router.post('/', async (req, res) => {
    const sensors = new DBschema({
        value: req.body.value
    })
    try{
        console.log(sensors);
        const newSensor = await sensors.save();
        res.status(201).json(newSensor);
        console.log(newSensor);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}); 

router.post('/push', async (req, res) => {
    var idPosted = req.body.id;
   var valuePosted = Number(req.body.value);

   var d = new Date();
   var dFormated = d.toLocaleString();

   console.log(idPosted);
   console.log(valuePosted);

    DBschema.updateOne(
        { _id: idPosted },
        { $push: { value: valuePosted, update: dFormated } },
        function(err, result) { 
          if (err) {
            res.send(err);
          } else {
            res.send(result);
            console.log("SENT");
          }
        }
      );



 });


module.exports = router