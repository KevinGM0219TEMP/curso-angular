import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {


  FormDatosUser:FormGroup = new FormGroup({});
  errorSession:boolean=false;
  ngOnInit():void{
    
    this.FormDatosUser = new FormGroup(
      {
        email:new FormControl('',[Validators.required,Validators.email]),
        password:new FormControl('',[Validators.required])
      });
  }
  constructor(private authService: AuthService,private router:Router){}
  sendLogin() {
  if (this.FormDatosUser.valid) {
    this.authService
      .sendCredentials(this.FormDatosUser.value.email, this.FormDatosUser.value.password)
      .subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/']);
          this.errorSession=false;
        },
        error: (err) => {
          console.error('Error en login:', err);
          this.errorSession=true;
        },
        complete: () => {
          console.log('Petición de login completada');
        }
      });
    } 
  

  }
  
}
