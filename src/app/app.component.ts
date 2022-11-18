import { Component, VERSION } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

interface Auth {
  token: string;
  username: string;
  profile: Array<String>;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loading = false;
  error = null;

  site = 'https://glacial-scrubland-11809.herokuapp.com';
  name = 'Spring Boot sample';

  login = 'ricardo.larguesa@fatec.sp.gov.br';
  password = '';

  auth = null;

  list = null;

  constructor(private http: HttpClient) {}

  postLogin() {
    this.error = null;
    this.loading = true;
    let url = this.site + '/login';
    let parameters = { login: this.login, senha: this.password };
    this.http.post<Auth>(url, parameters).subscribe({
      next: (data) => {
        this.auth = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }

  postLogout() {
    this.auth = null;
  }

  getList() {
    this.loading = true;
    this.error = null;
    let url = this.site + '/pessoas_fisicas';
    let parameters = { headers: { Authorization: 'Bearer ' + this.auth.token }};
    this.http.get<any>(url, parameters).subscribe({
      next: (data) => {
        this.list = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }
}
