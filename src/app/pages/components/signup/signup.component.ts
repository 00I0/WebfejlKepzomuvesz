import {Component} from "@angular/core";
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/models/user";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  username =  new FormControl('', [Validators.required, Validators.minLength(2)])
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required, Validators.minLength(6)])
  rePassword = new FormControl('', [Validators.required, Validators.minLength(6)])

  signUpForm = new FormGroup({
    username: this.username,
    email: this.email,
    password: this.password,
    rePassword: this.rePassword,
  });

  constructor(private location: Location, private authService: AuthService, private userService: UserService) { }


  submit() {
    let username : string = this.username.value || ''
    let email : string = this.email.value || ''
    let password : string = this.password.value || ''
    let rePassword : string = this.rePassword.value || ''

    if (!username || !email || !password || !rePassword) {
      alert('Egyik mező sem lehet üres.')
      return
    }

    if (username.length < 2) {
      alert('A felhasználónévnek legalább 2 karakter hosszúnak kell lennie')
      return;
    }

    if (!/^(.+)@(.+)$/gi.test(email)){
      alert('A megadott email nem érvényes')
      return;
    }

    if (password.length < 6) {
      alert('A jelszónak legalább 6 karakteresnek kell lennie.')
      return;
    }

    if (password !== rePassword) {
      alert('A jelszónak és a megerősítésének meg kell egyeznie')
      return;
    }


    this.authService.signup(email, password).then(cred => {
      const user = new User(cred.user?.uid as string, username, email);

      this.userService.insert(user).then(_ => {
        alert('Sikeres regisztráció')
        this.location.back();
      }).catch(error => {
        alert('Valami hiba történt a regisztráció során... :(')
      })
    }).catch(error => {
      alert('Valami hiba történt a regisztráció során... :(')
    });
  }

  goBack() {
    this.submit = () => {};
    this.location.back();
  }
}
