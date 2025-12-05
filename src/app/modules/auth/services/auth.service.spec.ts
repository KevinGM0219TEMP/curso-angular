import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import {HttpClientTestingModule} from '@angular/common/http/testing';


import * as mockData from '../../../data/user.json';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser : any =(mockData as any).default;
  let httpClientSpy: {post: jasmine.Spy} 
  let cookieServiceSpy: {set: jasmine.Spy} 

  beforeEach(() => {
    
    httpClientSpy = jasmine.createSpyObj('HttpClient',['post']);
    
    cookieServiceSpy = jasmine.createSpyObj('CookieService',['set']);
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    //service = TestBed.inject(AuthService);
    service = new AuthService(httpClientSpy as any,cookieServiceSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should send credentials and return a token', (done: DoneFn) => {
    //Arrange
    const user = mockUser.userOk;

    const expectedResponse = {
      tokenSession: 'asdasdasdasd123123123'
    }

    httpClientSpy.post.and.returnValue(
      of(expectedResponse)
    );

    //Act

    service.sendCredentials(user.email,user.password).subscribe(
      response =>{
        const reponseProperties = Object.keys(response);

        //Assert
        expect(response).toEqual(expectedResponse);
        expect(reponseProperties).toContain('tokenSession');
        done();
      }
    );

    


  });
});
