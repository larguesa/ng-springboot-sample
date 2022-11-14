import { Component, VERSION } from '@angular/core';

import { HttpClient } from '@angular/common/http';

interface Auth {
  token: string;
  username: string;
  profile: Array<String>;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  site = "https://glacial-scrubland-11809.herokuapp.com";
  name = 'Spring Boot sample';

  login = "ricardo.larguesa@fatec.sp.gov.br";
  password = "";

  auth = null;

  list = null;
  
  constructor(private http: HttpClient) { }

  postLogin(){
    this.http.post<Auth>(
      this.site+'/login', 
      { login: this.login, senha: this.password}
    ).subscribe(data => {
        this.auth = data;
      }
    );
  }

  postLogout(){
    this.auth = null;
  }

  getList(){
    this.http.get<any>(
      this.site+'/pessoas_fisicas', 
      {headers: {'Authorization':'Bearer '+this.auth.token}}
    ).subscribe(data => {
        this.list = data;
      }
    );
  }
  
}