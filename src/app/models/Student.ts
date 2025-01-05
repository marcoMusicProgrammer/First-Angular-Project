import {Classroom} from './Classroom';

export interface Student
{
  id?: number;
  name: string,
  surname: string,
  birthDate: Date,
  grades:{[key:string]:number},
  classrooms: {id:number}
}
