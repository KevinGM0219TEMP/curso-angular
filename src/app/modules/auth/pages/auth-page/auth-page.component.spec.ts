import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['sendCredentials']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule,ReactiveFormsModule],
      declarations: [AuthPageComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return invalid form', () => {
    //arrange

    const mockCredential ={
      email : 'eeee3#####',
      password: '1213213111111111'
    }

    const emailFormControl: any = component.FormDatosUser.get('email');
    const passwordFormControl: any = component.FormDatosUser.get('password');

    //Act
    emailFormControl.setValue(mockCredential.email);
    passwordFormControl.setValue(mockCredential.password);
    //Assert
    expect(component.FormDatosUser.invalid).toBeTrue();
  });


  it('should return invalid form', () => {
    //arrange

    const mockCredential ={
      email : 'test@example.com',
      password: 'ValidPassword123'
    }

    const emailFormControl: any = component.FormDatosUser.get('email');
    const passwordFormControl: any = component.FormDatosUser.get('password');

    //Act
    emailFormControl.setValue(mockCredential.email);
    passwordFormControl.setValue(mockCredential.password);
    //Assert
    expect(component.FormDatosUser.valid).toBeTrue();
  });
  it('should call sendCredentials and navigate on success', () => {
    // Arrange
    component.FormDatosUser.setValue({
      email: 'test@example.com',
      password: '123456'
    });

    const mockResponse = { token: '123' };
    authServiceMock.sendCredentials.and.returnValue(of(mockResponse));

    // Act
    component.sendLogin();

    // Assert
    expect(authServiceMock.sendCredentials).toHaveBeenCalledWith('test@example.com', '123456');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(component.errorSession).toBeFalse();
  });

  it('should set errorSession to true on login error', () => {
    // Arrange
    component.FormDatosUser.setValue({
      email: 'test@example.com',
      password: '123456'
    });

    authServiceMock.sendCredentials.and.returnValue(
      throwError(() => ({ error: 'Invalid credentials' }))
    );

    // Act
    component.sendLogin();

    // Assert
    expect(authServiceMock.sendCredentials).toHaveBeenCalled();
    expect(component.errorSession).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
