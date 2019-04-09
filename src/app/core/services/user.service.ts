import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class UserContext {
  roles: Array<any>;
  email: string;
  username: string;

  userValidate() {
    return this.roles && this.roles.length && this.username && this.email;
  }
}

export class UserRoleContext {
  accessGroups: Array<any>;
  info?: string;
  name: string;

  validate() {
    return this.accessGroups && this.accessGroups.length && this.name;
  }
}

export class UserAccessGroupContext {
  accessLevels: Array<any>;
  info?: string;
  name: string;

  validateAccessGroup() {
    return this.accessLevels && this.accessLevels.length && this.name;
  }
}

export class UserPasswordResetContext {
  password: string;
  token: string;
}

export class UpdateUserContext {
  contactNo: string;
  email: string;
  roles: Array<any>;
  updateUserValidate(){
    return this.contactNo && this.email && this.roles.length;
  }
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public detailId;

  constructor(private httpService: HttpClient) {
   }

  //get request
  getUsers() {  
    return this.httpService.get('/api/users');
  }

  sendUserId(userId) {
    this.detailId = userId;
  }
  getUser(){
    return this.httpService.get('/api/users/' + this.detailId);
  }
  getAccessGroups(){
     return this.httpService.get('/api/access-groups');
  }

  getAccessGroupById(){
    return this.httpService.get('/api/access-groups/{id}');
  }

  getAccessLevels(){
    return this.httpService.get('/api/access-levels');
  }

  getUserAccessGroups(){
    return this.httpService.get('/api/users/{id}/access-groups');
  }

  getUserAccessLevels(){
    return this.httpService.get('/api/users/{id}/access-levels');
  }

  getUserRoles(){
    return this.httpService.get('/api/users/{id}/roles');
  }

  
  getRoles(){
  return this.httpService.get('/api/roles');
  }

  
  getRole(){
    return this.httpService.get('/api/roles/{id}');
  }

  //post request
  
  createUser(userContext: UserContext){
    return this.httpService.post('/api/users', userContext);
  }

  createAccessGroup(userAccessGroupContext: UserAccessGroupContext){
    return this.httpService.post('/api/access-groups', userAccessGroupContext);            
  }

  resetPassword(context:UserPasswordResetContext){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic d2ViYXBwLXJ3OndlYmFwcC1ydy0xMjM0')
                .set('Content-Type', 'application/json');
    return this.httpService.post('/api/users/password/reset', context, {headers: headers});
  }

  createRole(userRoleContext: UserRoleContext){
    return this.httpService.post('/api/roles', userRoleContext);      
  }


  //put request

  updateUser(updateUserContext:UpdateUserContext){
    return this.httpService.put('/api/users/{id}', updateUserContext);
  }
}
