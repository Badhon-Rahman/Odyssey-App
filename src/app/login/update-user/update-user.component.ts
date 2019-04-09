import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService, UpdateUserContext} from '@app/core/services/user.service';
import { Logger } from '@app/core';
declare const jQuery: any;

const log = new Logger('update-user');
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  public roles: Array<any>;
  public updateUserContext: UpdateUserContext;

  constructor(private modalService: NgbModal, private _userService:UserService) { 
    this.updateUserContext = new UpdateUserContext();
  }

  ngOnInit() {
    this.getRoles();
  }

 //Modal Def
 open(content) {
  this.modalService.open(content,{ size:'lg',ariaLabelledBy: 'update-user'}).result.then((result) => {
  }, (reason) => {
  });
  setTimeout(()=>{
    jQuery('.selectpicker').selectpicker();
  }, 100);
  
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

  //update user account
  updateUser(){
    let roles = [];
    for(let index in this.updateUserContext.roles){
      let val = this.updateUserContext.roles[index];
      roles.push({
          "id": parseInt(val)
      })
    }
    this.updateUserContext.roles = roles;
    this._userService.updateUser(this.updateUserContext)
      .subscribe(
        response => {
          log.debug(`${response['data'].id} Updated.`);
          
        }, 
        error => {
          log.debug(`Get update user error: ${error}`);
        }
      );
  }
}
