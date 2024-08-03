import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_URL_BE} from '../../environments/environment';
import {genEnp} from '../../environments/environment-local';
import {Router} from '@angular/router';
import {UsersService} from './users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  endpoint = genEnp + 'AppRigister';

  public matricule: any;
  public password: any;

  constructor(private http: HttpClient, private route: Router, private uhttp: UsersService) {
  }

  login(matricule: string, password: string) {
  }

  getUsers() {
    this.uhttp.getAll().subscribe((data) => {
      const user = data.map((e) => {
        return {
          id: e.id,
          matricule: e.matricule,
          password: e.password,
          userAccount: e.userAccount,
        };
      });
    });
  }
}
