import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ContainerService, ContainerContext} from '@app/core/services/container.service';
import { Logger } from '@app/core';
declare const jQuery: any;

const log = new Logger('Contaier-list');

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  public containers=[];
  public containerTypeId=[];
  public parentId =0;
  public containerContext: ContainerContext;
  constructor(private modalService: NgbModal, private _containerService:ContainerService) {
   }

  OpenContainerCreate(content) {
    this.modalService.open(content,{ size:'lg',ariaLabelledBy: 'create-container'}).result.then((result) => {
    }, (reason) => {
      if(reason == 'cancel') this.initContext();
    });
  }

  ngOnInit() {
    this.initContext();
    this.getContainers();
    this.getContainerTypes();
  }

  initContext() {
    this.containerContext = new ContainerContext();
  }
  //Get Container list
  getContainers(){
    this._containerService.getContainers()
      .subscribe(
        response => {
          this.containers = response['data'];
        }, 
        error => {
          log.debug(`Get container list error: ${error}`);
        }
      );
  }

   //Get Container Type list
   getContainerTypes(){
    this._containerService.getContainerTypes()
      .subscribe(
        response => {
          this.containerTypeId = response['data'];
        }, 
        error => {
          log.debug(`Get container type list error: ${error}`);
        }
      );
  }

  //Create Container
  createContainer(){
    this._containerService.createContainer(this.containerContext)
      .subscribe(
        response => {
          log.debug(`${response['data'].name} created.`);
          this.getContainers();
        }, 
        error => {
          log.debug(`Get create container error: ${error}`);
        }
      );
  }
}
