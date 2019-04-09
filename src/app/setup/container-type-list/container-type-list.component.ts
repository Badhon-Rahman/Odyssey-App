import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ContainerService, ContainerTypeContext } from '@app/core/services/container.service';
import { Logger } from '@app/core';

const log = new Logger('Contaier-type-list');

@Component({
  selector: 'app-container-type-list',
  templateUrl: './container-type-list.component.html',
  styleUrls: ['./container-type-list.component.scss']
})
export class ContainerTypeListComponent implements OnInit {
  public containers=[];
  name: string;
  info: string;
  containerTypeContext: ContainerTypeContext;
  constructor(private modalService: NgbModal, private _containerService:ContainerService) {
    this.containerTypeContext = new ContainerTypeContext();
   }

  OpenContainerTypeCreate(content) {
    this.modalService.open(content,{ size:'lg',ariaLabelledBy: 'create-container-type'}).result.then((result) => {
    }, (reason) => {
    });
  }

  ngOnInit() {
     this.getContainerTypes();
  }

  //Get Container Type list
  getContainerTypes(){
    this._containerService.getContainerTypes()
      .subscribe(
        response => {
          this.containers = response['data'];
        }, 
        error => {
          log.debug(`Get container type list error: ${error}`);
        }
      );
  }

  //Create Container Type
  createContainerType(){
    this._containerService.createContainerType(this.containerTypeContext)
      .subscribe(
        response => {
          log.debug(`${response['data'].name} created.`);
          this.getContainerTypes();
        }, 
        error => {
          log.debug(`Get create container type error: ${error}`);
        }
      );
  }

}
