//importing modules
import { Validate, Required, Optional, Nullable, NotEmpty, MaxLength,ItemType } from "joi-typescript-validator"
import { IPerson } from '../../src/app/persons/persons.model'

export class Person implements IPerson {
    @Optional()
    id?: number;

    @Required()
    @NotEmpty()
    @MaxLength(30)
    name: string = '';

    @NotEmpty()
    @MaxLength(6)
    gender: string = 'Female';

    @Nullable()
    @MaxLength(60)
    company: string = '';

    @Optional()
    @MaxLength(30)
    age: number = 0;
}

//validation schema
export const PersonValidate = function(value: Person) {
    return Validate(Person, value);
}
