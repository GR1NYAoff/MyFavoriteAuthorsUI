import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/models/loginRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public get isLoggedIn(): boolean {
    return this.as.isAuthenticated();
  }

  ngOnInit(): void {}

  constructor(private as: AuthService) {}

  loginData: LoginRequest = new LoginRequest();
  regData: LoginRequest = new LoginRequest();

  isRegister: boolean = false;

  login(data: LoginRequest): any {
    this.as.login(data).subscribe(
      (res) => {},
      (error) => {
        alert('Wrang email or password');
      }
    );
  }

  getRegisterForm() {
    this.isRegister = true;
  }
  cancelRegistration() {
    this.isRegister = false;
  }

  register(data: LoginRequest): any {
    this.as.register(data).subscribe(
      (res: any) => {
        this.isRegister = false;
        alert('Account successfully registered');
      },
      (error: any) => {
        alert('Wrang login, email or password');
      }
    );
  }

  logout() {
    this.as.logout();
  }
}
