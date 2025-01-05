import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ClassroomViewComponent} from './components/classroom-view/classroom-view.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClassroomViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Classroom';
}
