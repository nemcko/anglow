//import modules
import { LowDbAdapter, IPerson, IRequestData } from '../services/lowdblib.js'
import { personServices } from '../services/person.service.js'
import { Request, Response } from 'express'

import { PersonValidate } from '../models/person.model.js'

class PersonController {
    constructor(public db?: LowDbAdapter) { }
    //add person controller
    addPerson = async (req: Request, res: Response) => {
        //data to be saved in database
        const data: IPerson = {
            name: req.body.name,
            gender: req.body.gender,
            company: req.body.company,
            age: req.body.age
        }
        //validating the request
        const { error, value } = PersonValidate(data)
        personServices.db = this.db;

        if (error) {
            res.send(error.message)

        } else {
            //call the create person function in the service and pass the data from the request
            const person = await personServices.createPerson(value)
            res.status(201).send(person)
        }
    }

    //get all persons
    getPersons = async (req: Request, res: Response) => {
        personServices.db = this.db;
        const persons = await personServices.getPersons()
        res.send(persons)
    }


    //get a single person
    getAPerson = async (req: Request, res: Response) => {
        //get id from the parameter
        const id = Number(req.params.id)
        personServices.db = this.db;
        const person = await personServices.getPerson(id)
        res.send(person)
    }

    //update person
    updatePerson = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const { error, value } = PersonValidate(req.body)
        personServices.db = this.db;

        if (error) {
            res.status(500).send(error.message)
        } else {
            const person = await personServices.updatePerson(id, value)
            res.status(201).send(person)
        }
    }


    //delete a person
    deletePerson = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        personServices.db = this.db;
        const ok = await personServices.deletePerson(id)
        res.status((ok ? 200 : 500)).send()
    }


    //paginate persons
    paginatePerson = async (req: Request, res: Response) => {
        personServices.db = this.db;
        const person = await personServices.paginatePerson(req, res)
        res.status(201).send(person)
    }

}

//export class
export const personController = new PersonController()