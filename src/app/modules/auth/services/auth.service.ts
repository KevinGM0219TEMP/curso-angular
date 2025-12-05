import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable,tap } from 'rxjs';
import { enviroment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL= enviroment.api;
  constructor(private httpClient:HttpClient,private cookieService: CookieService) { }

  sendCredentials(email:string,password:string): Observable<any>{
    const body ={
      "email":email,
      "password": password
    };
    console.log('asdasdsda',body,this.URL)
    return this.httpClient.post<any>(`${this.URL}/auth/login`,body).pipe(
      tap(data=>{
        this.cookieService.set('token',data.tokenSession,4,'/');
      }
      )
    );
  }
}
