import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bienestar';
  mostrarPeriodo: boolean = true; // Asegúrate de que esté en true para mostrar el componente
  
  
}
