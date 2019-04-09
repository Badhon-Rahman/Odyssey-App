import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService, UserContext} from '@app/core/services/user.service';
import { Logger } from '@app/core';
declare const jQuery: any;

const log = new Logger('User-list');

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: Array<any>;
  public roles: Array<any>;
  public userContext: UserContext;
  public userId;
  constructor(private modalService: NgbModal, private _userService:UserService) {
  }

  //Modal Def
  open(content) {
    this.modalService.open(content,{ size:'lg',ariaLabelledBy: 'create-new-user'}).result.then((result) => {
    }, (reason) => {
      if(reason == 'cancel') this.initContext();
    });
    
    
  }

  ngOnInit() {
    this.initContext();
    this.getRoles();
    this.getUsers();
    this.sendUserId(this.userId);
    
  }

  initContext() {
    this.userContext = new UserContext();
  }

  //Get User list
  getUsers(){
    this._userService.getUsers()
      .subscribe(
        response => {
          this.users = response['data'];
        }, 
        error => {
          log.debug(`Get user list error: ${error}`);
        }
      );
  }
 
  sendUserId(userId){
    return this._userService.sendUserId(userId);  
  }

  //Get Roles
  getRoles(){
    this._userService.getRoles()
      .subscribe(
        response => {
          this.roles = response['data'];
        }, 
        error => {
          log.debug(`Get Roles error: ${error}`);
        }
      );
  }

  //Create New User
  createUser(){
    let roles = [];
    for(let index in this.userContext.roles){
      let val = this.userContext.roles[index];
      roles.push({
          "id": parseInt(val)
      })
    }
    this.userContext.roles = roles;
    this._userService.createUser(this.userContext)
      .subscribe(
        response => {
          log.debug(`${response['data'].id} created.`);
          this.getUsers();
        }, 
        error => {
          log.debug(`Get create user error: ${error}`);
        }
      );
  }

}
