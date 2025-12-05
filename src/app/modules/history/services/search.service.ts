import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { enviroment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly URL = enviroment.api;
  constructor(private httpCliente: HttpClient) { }
  
  searchTracks(term: string){
    return this.httpCliente.get(`${this.URL}/tracks?src=${term}`)
    .pipe(
      map((response:any) => response.data)
    );
  }
}
