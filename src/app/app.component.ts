import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'curso-angular';

  nombre: string = "Juan";
  edad: number = 22;
  apellido: any = "ads";

  auto: AutoModel ={
    marca:"toyota",
    modelo:"Coroila",
    año:2020
  }
  listaAutos:Array<AutoModel> =[this.auto]
}
interface AutoModel{
  marca:string,
  modelo:string,
  año:number
}