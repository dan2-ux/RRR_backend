import {Remider} from '../module/Modules.js'
import express from 'express'

const route = express.Router();

route.get('/', async (req,res) => {
    try{
        const data = await Remider.find({});
        res.status(200).json(data);
    }
    catch(e){
        res.status(404).json({message: e.message})
    }
})

route.post('/', async (req,res) => {
    try{
        const input = req.body;
        if( !input.title || !input.endTime || !input.endDate){
            return res.status(400).json({message: "Fill all the data"})
        }
        const newData = {
            title: input.title,
            endTime: input.endTime,
            endDate: input.endDate,
        }
        const data = await Remider.create(newData);
        res.status(200).json(data)
    }
    catch(e){
        console.log(e.message)
    }
})

route.delete('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const doDelete = await Remider.findByIdAndDelete(id);
        if(!doDelete){
            return res.status(404).json({message: "Error Cant Delete"})
        }
        res.status(200).json({message: "Successfully Delete"})
    }
    catch(e){
        res.status(404).json({message: e.message})
    }
})

route.put('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const data = {
            title: req.body.title,
            endTime: req.body.endTime,
            endDate: req.body.endDate
        }
        const doUpdate = await Remider.findByIdAndUpdate(id, data)
        if(!doUpdate){
            return res.status(404).json({message: "Error Failed to Update"})
        }
        
        res.status(200).json(await Remider.findById(id))
    }
    catch(e){
        res.status(404).json({message: e.message})
    }
})

route.get('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const doFind = await Remider.findById(id);
        if(!doFind){
            return res.status(404).json({message: "Error Cant Find"})
        }
        res.status(200).json(doFind)
    }
    catch(e){
        res.status(404).json({message: e.message})
    }
})

export default route