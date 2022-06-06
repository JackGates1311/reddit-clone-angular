import {EventEmitter, Injectable, Output} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegisterRequestPayload} from "../register/registerRequestPayload";
import {Observable} from "rxjs";
import {LoginRequestPayload} from "../login/loginRequestPayload";
import {LoginResponsePayload} from "../login/loginResponsePayload";
import {map} from "rxjs/operators";
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({

  providedIn: 'root'
})

export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }

  register(registerRequestPayload: RegisterRequestPayload): Observable<any> {

    return this.httpClient.post('http://localhost:8080/api/auth/register', registerRequestPayload,
        {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {

    return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/login', loginRequestPayload).pipe(
        map(data => {

          this.localStorage.store('authToken', data.authToken);
          this.localStorage.store('expiresIn', data.expiresIn);

          this.loggedIn.emit(true);

          return true;

        }));
  }

  logout() {

      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('expiresIn');
  }
}