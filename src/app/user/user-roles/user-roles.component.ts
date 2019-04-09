import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService, UserRoleContext, UserAccessGroupContext } from '@app/core/services/user.service';
import { Logger } from '@app/core';
import { asap } from 'rxjs/internal/scheduler/asap';

declare const jQuery: any;

const log = new Logger('User-roles');


@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
  public accessGroups: Array<any>;
  public roles: Array<any>;
  public userRoleContext: UserRoleContext;
  public userAccessGroupContext: UserAccessGroupContext;
  public allAccessLevel: Array<any>;

  constructor(private modalService: NgbModal, private _userService:UserService) {
   }


  openCreateRole(content) {
    this.modalService.open(content,{ size:'lg',ariaLabelledBy: 'create-role'}).result.then((result) => {
    }, (reason) => {
      if(reason == 'cancel') this.initContext();
    });
    
  }

  openAccessGroup(content) {
    this.modalService.open(content,{ size:'lg',ariaLabelledBy: 'create-access-group'}).result.then((result) => {
    }, (reason) => {
      if(reason == 'cancel') this.initContext();
    });
  }

  initContext() {
    this.userRoleContext = new UserRoleContext();
    this.userAccessGroupContext = new UserAccessGroupContext();
  }

  ngOnInit() {
    this.initContext();
    this.getAllAccessLevels();
    this.getAccessGroups();
    this.getRoles();
  }

  getAllAccessLevels() {
    this._userService.getAccessLevels().subscribe(
      response => {
        log.debug(`Total access levels: ${response['data'].length}`);
        this.allAccessLevel = response['data'];
      }, 
      error => {
        log.debug(`Get create user error: ${error}`);
      }
    );
  }


  //Get Access Groups
  getAccessGroups(){
    this._userService.getAccessGroups()
      .subscribe(
        response => {
          this.accessGroups = response['data'];
        }, 
        error => {
          log.debug(`Get Access Group error: ${error}`);
        }
      );
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

    //Create Access Group
    createAccessGroup(){
      this.userAccessGroupContext.accessLevels = this.userAccessGroupContext.accessLevels.map(x => { return {"id": x.id}});
      this._userService.createAccessGroup(this.userAccessGroupContext)
        .subscribe(
          response => {
            log.debug(`${response['data'].id} created.`);
            this.getAccessGroups();
            this.initContext();
          }, 
          error => {
            log.debug(`Get create access group error: ${error}`);
          }
        );
    }

     //Create Role
  createRole() {
    this.userRoleContext.accessGroups = this.userRoleContext.accessGroups.map(x => { return {"id": x.id}});
    this._userService.createRole(this.userRoleContext)
      .subscribe(
        response => {
          log.debug(`${response['data'].id} created.`);
          this.getRoles();
          this.initContext();
        },
        error => {
          log.debug(`Get create role error: ${error}`);
        }
      );
  }

}
