import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


export class ContainerContext {
  info: string;
  name: string;
  parentId: number;
  containerTypeId: number;

  containerValidate() {
    return this.name && this.containerTypeId;
  }
}

export class ContainerTypeContext {
  info: string;
  name: string;
  containerTypeValidate() {
    return this.name ;
  }
}

export class UpdateContainerTypeContext {
  info: string;
  level: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  public typeId:any;

  constructor(private httpService: HttpClient) { }
   
  sendContainerId(dropId){
    this.typeId = dropId;
  }

  //get request
  getContainers(){
    return this.httpService.get('/api/containers');
  }
 
  getContainer(){
    return this.httpService.get('/api/containers/{id}');
  }


  getContainerTypes(){
    return this.httpService.get('/api/containers/type');
  }

  getContainerType(){
    return this.httpService.get('/api/containers/type/' + this.typeId);
  }

  //post request
  createContainer(containerContext:ContainerContext){
    return this.httpService.post('/api/containers', containerContext);
  }

  createContainerType(containerTypeContext:ContainerTypeContext){
    return this.httpService.post('/api/containers/type', containerTypeContext);            
  }

  //put request
  updateContainerType(updateContainerTypeContext:UpdateContainerTypeContext){
      return this.httpService.put('/api/containers/type/' + this.typeId, updateContainerTypeContext);
  }
}

