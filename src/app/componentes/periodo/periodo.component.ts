import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodoService } from 'src/app/servicios/periodo.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
})
export class PeriodoComponent implements OnInit {
  periodos: any[] = [];
  periodoForm: FormGroup;
  mensaje: string = '';
  mensajeTipo: 'exito' | 'error' = 'exito';
  mostrarPeriodo: boolean = true;

  constructor(private periodoService: PeriodoService, private fb: FormBuilder) {
    this.periodoForm = this.fb.group({
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      estado: ['', [Validators.required]],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerPeriodos();
  }

  obtenerPeriodos(): void {
    this.periodoService.obtenerPeriodos().subscribe((data: any[]) => {
      this.periodos = data;
    }, (error: any) => {
      this.mostrarMensaje('Error al obtener períodos', 'error');
    });
  }

  agregarPeriodo(): void {
    if (this.periodoForm.valid) {
      this.periodoService.agregarPeriodo(this.periodoForm.value).subscribe(() => {
        this.mostrarMensaje('Período agregado con éxito', 'exito');
        this.obtenerPeriodos();
        this.periodoForm.reset();
      }, (error: any) => {
        this.mostrarMensaje('Error al agregar período', 'error');
      });
    } else {
      this.mostrarMensaje('Por favor, completa el formulario correctamente', 'error');
    }
  }

  eliminarPeriodo(id: number): void {
    this.periodoService.eliminarPeriodo(id).subscribe(() => {
      this.mostrarMensaje('Período eliminado con éxito', 'exito');
      this.obtenerPeriodos();
    }, (error: any) => {
      this.mostrarMensaje('Error al eliminar período', 'error');
    });
  }

  mostrarMensaje(mensaje: string, tipo: 'exito' | 'error'): void {
    this.mensaje = mensaje;
    this.mensajeTipo = tipo;
    setTimeout(() => {
      this.mensaje = ''; // Desaparece el mensaje después de 5 segundos
    }, 5000);
  }
}
