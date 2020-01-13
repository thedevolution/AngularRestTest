import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/model/credentials';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = new Credentials();
  errorMsg = "";
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // Anytime this is initialized, make sure the user is logged out
    this.logout();
  }

  login() {
    this.authenticationService.authenticate(this.credentials).subscribe(authenticatedUser => {
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.errorMsg = err;
      }
    );
  }

  logout() {
    this.authenticationService.invalidate();
  }
}
