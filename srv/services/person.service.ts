//import module
import { LowDbAdapter, IPerson } from '../services/lowdblib.js'

export class PersonService {
    constructor(public db?: LowDbAdapter) { }

    //create a person
    async createPerson(data: any) {
        try {
            const person = await this?.db?.createObject('persons', data)
            console.log('PersonService.createPerson:', person)
            return person
        } catch (error) {
            console.log(error)
        }
    }

    //get all persons
    async getPersons() {
        try {
            const persons = await this?.db?.allObjects('persons')
            // console.log('PersonService.getPersons:', persons)
            return persons
        } catch (error) {
            console.log(error)
        }
    }

    //get a single person
    async getPerson(id: number) {

        try {
            const person = await this?.db?.findObjectById('persons', id)
            // console.log('PersonService.getPerson:', person)
            return person

        } catch (error) {
            console.log(error)
        }
    }

    //update a person
    updatePerson(id: number, data: any) {
        if (id) {
            return this?.db?.saveObjectById('persons', id, data)
        } else {
            return this?.db?.createObject('persons', data)
        }
    }

    //delete a person by using the find by id and delete 
    deletePerson(id: number) {
        return this?.db?.deleteObjectById('persons', id)
    }

    //update a person
    async paginatePerson(req: any, res: any) {
        try {
            await this?.db?.paginate(req, res, 'persons', 'id,name,gender,company,age', { search: 'name' })
        } catch (error) {
            console.log(error)
        }
    }

}

//export the class
export const personServices = new PersonService()