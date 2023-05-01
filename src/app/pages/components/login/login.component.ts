import {Component} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent{
  title = 'Login'
  email = new FormControl('');
  password = new FormControl('')


  constructor(private router: Router, private authService: AuthService) {
  }



  login(): void {
    this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
      alert("Sikeres bejelentkezés")
      this.router.navigateByUrl('/shop');
    }).catch(error => {
      alert('Hibás jelszó vagy felhasználónév')
    }).catch(error => {
      alert('Hibás jelszó vagy felhasználónév')
    })
  }
}
