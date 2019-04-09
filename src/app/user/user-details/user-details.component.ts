import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/core/services/user.service';
import { Logger } from '@app/core';

const log = new Logger('User-details');

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public userName;
  public email;
  public role;
  
  constructor(private _userService:UserService) { }

  ngOnInit() {
    this.getUser();
  }

  //Get User details
  getUser(){
    this._userService.getUser()
      .subscribe(
        response => {
          this.userName = response['data'].username;
          this.email = response['data'].email;
          this.role = response['data'].roles;
        }, 
        error => {
          log.debug(`Get user details error: ${error}`);
        }
      );
  }


}
