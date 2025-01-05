import {Classroom} from './Classroom';

export interface Teacher{
  id?: number;
  name: string;
  surname: string;
  birthDate: Date;
  classrooms: Classroom[];
}
