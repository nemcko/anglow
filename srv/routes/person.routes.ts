// //importing modules
import express from "express";
import asyncHandler from '../../node_modules/express-async-handler/index.js'
import { personController } from '../controllers/person.controller.js'

//initiating the router
export const personRoutes = express.Router()

// add person route
personRoutes.post('/', asyncHandler(personController.addPerson))

//get persons
personRoutes.get('/', asyncHandler(personController.getPersons))

//get single person 
personRoutes.get('/:id', asyncHandler(personController.getAPerson))

//update a person
personRoutes.put('/:id', asyncHandler(personController.updatePerson))

//delete a person
personRoutes.delete('/:id', asyncHandler(personController.deletePerson))

//paginate persons
personRoutes.post('/paginate', asyncHandler(personController.paginatePerson))

// preflit 
personRoutes.options('/', asyncHandler(async (req, res) => {
    res.status(201).send('ok')
}))
