import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LifecycleLoggerService } from '@shared/services/lifecycle-logger.service';

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
  styleUrls: ['./lifecycle-child.component.css']
})
export class LifecycleChildComponent implements OnChanges{

  @Input() parentData : string = '';
  cambiosDetectados:number=0;
  constructor(private logger: LifecycleLoggerService){
      this.logger.log('LifecycleDemoComponent','constructor','Componente hijo creado');
  }


  ngOnInit(): void {
    this.logger.log('LifecycleDemoComponent','ngOnInit','Componente hijo inicializado');
  }
  ngOnDestroy(): void {
    this.logger.log('LifecycleDemoComponent','ngOnDestroy','Componente hijo destruido');
  }
  ngAfterViewInit(){
    this.logger.log('LifecycleDemoComponent','ngAfterViewInit','Vista del componente hijo inicializada')
  }
  ngOnChanges(changes : SimpleChanges):void{
    const cambios = Object.keys(changes).map(key=>{
      const change = changes[key];
      const prev = change.previousValue;
      const curr =change.currentValue;
      return ('Propiedad: '+key+', Anterior: '+prev+', Actual: '+curr)
    }).join(', ');
    this.logger.log('LifecycleDemoComponent','ngOnChanges',('Datos del componente padre cambiaron: '+cambios))
  }

  ngDoCheck(): void{
    this.cambiosDetectados++;
    if(this.cambiosDetectados <= 5){
    this.logger.log('LifecycleDemoComponent','ngDoCheck','Deteccion de cambios en el componente hijo');
    }
  }
}
