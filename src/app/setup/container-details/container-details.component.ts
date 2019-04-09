import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ContainerService } from '@app/core/services/container.service';
import { Logger } from '@app/core';
declare const jQuery: any;


const log = new Logger('Contaier-list');


@Component({
  selector: 'app-container-details',
  templateUrl: './container-details.component.html',
  styleUrls: ['./container-details.component.scss']
})
export class ContainerDetailsComponent implements OnInit {
  public containers=[];
  constructor(private modalService: NgbModal, private _containerService:ContainerService) { }

  OpenAttributes(content) {
    this.modalService.open(content,{ size:'lg',ariaLabelledBy: 'create-attribute'}).result.then((result) => {
    }, (reason) => {
    });
    setTimeout(()=>{
      jQuery('.selectpicker').selectpicker();
    }, 100);
    
  }
  OpenBehavior(content1) {
    this.modalService.open(content1,{ size:'lg',ariaLabelledBy: 'create-behavior'}).result.then((result) => {
    }, (reason) => {
    });
  }

  ngOnInit() {
    // this.items = this._containerService.GetContainerList();
    this.getContainer();
  }

  //Get Container details
  getContainer(){
    this._containerService.getContainer()
      .subscribe(
        response => {
          this.containers = response['data'];
        }, 
        error => {
          log.debug(`Get container details error: ${error}`);
        }
      );
  }

}
