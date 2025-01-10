import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Classroom} from '../../models/Classroom';
import {AsyncPipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Teacher} from '../../models/Teacher';
import {BehaviorSubject} from 'rxjs';
import {join} from '@angular/compiler-cli';
import {Student} from '../../models/Student';

@Component({
  selector: 'app-classroom-view',
  imports: [
    FormsModule,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './classroom-view.component.html',
  styleUrl: './classroom-view.component.css'
})
export class ClassroomViewComponent {
  classrooms$ = new BehaviorSubject <Classroom[]>([])
  teachers$ = new BehaviorSubject <Teacher[]>([])
  teacherAndClassroom$ = new BehaviorSubject <(Teacher | Classroom)[]>([])
  students$ = new BehaviorSubject<Student[]>([]);


  constructor(private http:HttpClient)
  {
    this.http.get<Classroom[]>("api/classroom").subscribe(
      response => this.classrooms$.next(response)
    )

    this.http.get<Teacher[]>("api/teacher").subscribe(
      response => this.teachers$.next(response)
    )

    this.http.get<Student[]>("api/student").subscribe(
      response => this.students$.next(response)
    )

  }

  trackById(index: number, item: Teacher): number {
    return item.id!;
  }

  classroomToInsert: Classroom = {year:0,section:"",students:[],teachers:[]}
  salvaClassroom()
  {
    this.http.post<Classroom>("api/classroom",this.classroomToInsert).subscribe(
      response => {
        const updatedClassroom = [...this.classrooms$.value,response]
        this.classrooms$.next(updatedClassroom)
        this.classroomToInsert = { year: 0, section: "", students: [], teachers: [] }; // Reset
      }
    )
  }

  eliminaClassroom(id:number)
  {
    this.http.delete<Classroom>("api/classroom/"+id).subscribe(
      response => {
        const updatedClassroom = this.classrooms$.value.filter(d => d.id != id)
        this.classrooms$.next(updatedClassroom)
      }
    )
  }

  teacherToInsert: Teacher = {name:"",surname:"",birthDate:new Date(),classrooms:[]}
  salvaTeacher()
  {
    this.http.post<Teacher>("api/teacher",this.teacherToInsert).subscribe(
      response => {
        const updateTeacher = [...this.teachers$.value,response]
        this.teachers$.next(updateTeacher)
        this.teacherToInsert = { name: "", surname: "", birthDate: new Date(), classrooms:[]}; // Reset
      }
    )
  }

  eliminaTeacher(id: number)
  {
    this.http.delete<Teacher>("api/teacher/"+id).subscribe(
      response => {
        const updateTeacher = this.teachers$.value.filter(t => t.id != id)
        this.teachers$.next(updateTeacher)
      }
    )
  }

  teacherId:number = 0;
  classroomId:number = 0;

  collega_teacher_classroom()
  {
    this.http.post<Teacher>(`api/teacher/${this.teacherId}/classrooms/${this.classroomId}`, {}).subscribe(
      response => {
        const updateListTeacherAndClassroom = [...this.teacherAndClassroom$.value, response]
        this.teacherAndClassroom$.next(updateListTeacherAndClassroom)
        this.classroomId = 0
        this.teacherId = 0
      }
    )
  }

  getClassroomsAsString(classrooms: { section: string }[]): string {
    return classrooms.map(l => l.section).join(', ');
  }


  studentToInsert: Student = {name:"",surname:"",birthDate: new Date,grades: {},classrooms: {id:0}}

  salvaStudente() {
    this.http.post<Student>("api/student", this.studentToInsert).subscribe(
      response => {
        // Aggiorna la lista degli studenti con il nuovo studente
        const updatedStudents = [...this.students$.value, response];
        this.students$.next(updatedStudents);
        this.studentToInsert = {name:"",surname:"",birthDate: new Date,grades: {},classrooms: {id:0}}
      }
    )
  }

  eliminaStudente(id:number)
  {
    this.http.delete<Student>("api/student/"+id).subscribe(
      response => {
        const updateStudent = this.students$.value.filter(t => t.id != id)
        this.students$.next(updateStudent)
      }
    )
  }


}
