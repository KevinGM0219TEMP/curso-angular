import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LifecycleLoggerService } from '@shared/services/lifecycle-logger.service';

@Component({
  selector: 'app-lifecycle-demo',
  templateUrl: './lifecycle-demo.component.html',
  styleUrls: ['./lifecycle-demo.component.css']
})
export class LifecycleDemoComponent  implements OnInit, AfterViewInit{

  inputData: string = '';
  parentData: string ='';
  cambiosDetectados : number =0;
  constructor(private logger: LifecycleLoggerService,private router :Router){
    this.logger.log('LifecycleDemoComponent','constructor','Componente padre creado');
  }
  updateChildData(){
    this.parentData = this.inputData
  }

  goToTracks(): void {
    this.router.navigate(['/tracks']);
  }
  ngOnInit(): void {
    this.logger.log('LifecycleDemoComponent','ngOnInit','Componente padre inicializado');
  }
  ngOnDestroy(): void {
    this.logger.log('LifecycleDemoComponent','ngOnDestroy','Componente padre destruido');
  }
  ngAfterViewInit(){
    this.logger.log('LifecycleDemoComponent','ngAfterViewInit','Vista del componente padre inicializada')
  }
  ngAfterViewChecked(){
    this.logger.log('LifecycleDemoComponent','ngAfterViewChecked','Vista del componente padre');
  }
  ngAfterContentInit(){
    this.logger.log('LifecycleDemoComponent','ngAfterContentInit','Contexto del componente padre');
  }
  ngDoCheck(): void{
    this.cambiosDetectados++;
    if(this.cambiosDetectados <= 5){
          this.logger.log('LifecycleDemoComponent','ngDoCheck','Deteccion de cambios en el componente padre');

    }
  }

  ngAfterContentChecked(): void{
    this.logger.log('LifecycleDemoComponent','ngContextChecked','Contexto del componente padre');
  }
}
