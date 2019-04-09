import { Component, OnInit } from '@angular/core';
import { ContainerService, UpdateContainerTypeContext } from '@app/core/services/container.service';
import { DropEvent } from 'angular-draggable-droppable';
import { Logger } from '@app/core';

const log = new Logger('Contaier-type-setup');

@Component({
  selector: 'app-container-type-setup',
  templateUrl: './container-type-setup.component.html',
  styleUrls: ['./container-type-setup.component.scss']
})
export class ContainerTypeSetupComponent implements OnInit {

  public dragList = [];
  public droppedData:Array<any>;
  public dropId:any;
  public containerTypeName: string;
  public lavelup = 0;
  public updateContainerTypeContext: UpdateContainerTypeContext;
  public dropDataID = [];
  public itemDeleted:any;
  public containerTypeInfo:string;
  public deleteId:any;
  
  
  constructor(private _containerService:ContainerService){
    this.updateContainerTypeContext = new UpdateContainerTypeContext();
  }

  ngOnInit() {
    this.getContainerTypes();
    this.droppedData = [];
    this.dropDataID = [];
  }

  //Get Container Type list
  getContainerTypes(){
    this._containerService.getContainerTypes()
      .subscribe(
        response => {
          this.dragList = response['data'];
        }, 
        error => {
          log.debug(`Get container type list error: ${error}`);
        }
      );
  }

 
  
  //Drop Event
  // onItemDeleted(id: number){ 
  //   for(var i = 0; i < this.droppedData.length; i++) {
  //     if(this.droppedData[i].id == id) {
  //       return i;
  //     }
  //   }
  //   return id;
  // }
  onDrop({ dropData}: DropEvent<any>): void {
    this.lavelup += 1;
    this.dropId = dropData;
    this.dropDataID.push(this.dropId);
    this.sendContainerId(dropData);
    this.getContainerType();
    this.updateContainerType();
    for(var i = 0; i < this.dragList.length; i++){
      if(this.dragList[i].id == dropData){
         this.dragList.splice(i, 1);
        console.log(i);
        console.log(dropData);
      }
   }
  }

  sendContainerId(dropId){
     return this._containerService.sendContainerId(dropId);
  }

   //Get Container Type by Id
   getContainerType(){
    this._containerService.getContainerType()
    .subscribe(
      response => {
        this.droppedData.push(response['data']);
        this.containerTypeName = response['data'].name;
        this.containerTypeInfo = response['data'].info;
      }, 
      error => {
        log.debug(`Get container type error: ${error}`);
      }
    );
  }

  //Get Container Type Again
  getContainerTypeAgain(){
    this._containerService.getContainerType()
    .subscribe(
      response => {
        this.dragList.push(response['data']);
      }, 
      error => {
        log.debug(`Get container type error: ${error}`);
      }
    );
  }

  deleteDropData(){
    console.log(this.deleteId);
    this.lavelup = 0;
          for(var i=0;i<this.droppedData.length;i++){
            if(this.droppedData[i].id == this.deleteId){
              this.droppedData.splice(i, 1);
              this.sendContainerId(this.deleteId);
              this.getContainerTypeAgain();
              this.updateContainerType();
            }
          }  

    for(var i = 1; i < this.droppedData.length; i++){
      this.lavelup += 1;
      this.dropId = this.droppedData[i].id;
      this.sendContainerId(this.dropId);
      this.updateContainerType(); 
      console.log(this.dropId);
    }

  }

  //Update Container Type lavel
  updateContainerType(){
    this.updateContainerTypeContext.name = this.containerTypeName;
    this.updateContainerTypeContext.info = this.containerTypeInfo;
    this.updateContainerTypeContext.level = this.lavelup;
    this._containerService.updateContainerType(this.updateContainerTypeContext)
    .subscribe(
      response => {
        log.debug(`${response['data']} updated.`);
      }, 
      error => {
        log.debug(`Get update container type error: ${error}`);
      }
    );
  }
}
