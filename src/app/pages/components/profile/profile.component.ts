import {Component, OnChanges, OnInit} from "@angular/core";
import {User} from "../../../shared/models/user";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";
import {Location} from "@angular/common";

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnChanges, OnInit{
  user?: User;

  constructor(private authService: AuthService, private router: Router, private userService: UserService,
              private location: Location ) {
  }


  ngOnChanges(): void {
    this.authService.getCurrentUser().then(user => {
      this.user = user
    }).catch(_ => {});
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().then(user => {
      this.user = user
    }).catch(_ => {});
  }

  logout() {
    this.authService.signOut().then(_ => this.router.navigateByUrl(''))
  }

  deleteProfile() {
    if (!this.user) return

    try{
      this.authService.deleteCurrentUser();
    } catch (_) {

    }

    this.userService.delete(this.user.id).catch(error => {
      alert('Nem sikerült a profil törlése, ha sok idő eltelt a bejelentkezés óta, akkor biztonsági okokból csak ' +
        'újbóli bejelentkezés után lehetséges a törlés.')
    }).then(this.user = undefined);
    this.router.navigateByUrl('')
  }
}
