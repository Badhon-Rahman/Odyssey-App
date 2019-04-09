import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ContainerService } from '@app/core/services/container.service';
import { Logger } from '@app/core';
declare const jQuery: any;

const log = new Logger('Contaier-type-details');
@Component({
  selector: 'app-container-type-details',
  templateUrl: './container-type-details.component.html',
  styleUrls: ['./container-type-details.component.scss']
})
export class ContainerTypeDetailsComponent implements OnInit {
  public items=[];
  constructor(private modalService: NgbModal, private _containerService:ContainerService) { }

  OpenAttributeType(content) {
    this.modalService.open(content,{ size:'lg',ariaLabelledBy: 'create-attribute-type'}).result.then((result) => {
    }, (reason) => {
    });
    setTimeout(()=>{
      jQuery('.selectpicker').selectpicker();
    }, 100);
    
  }
  OpenBehaviorType(content1) {
    this.modalService.open(content1,{ size:'lg',ariaLabelledBy: 'create-behavior-type'}).result.then((result) => {
    }, (reason) => {
    });
  }

  ngOnInit() {
    // this.items = this._containerService.GetContainerTypeList();
    this.getContainerType();
  }

  //Get Container Type details
  getContainerType(){
    this._containerService.getContainerType()
      .subscribe(
        response => {
          this.items = response['data'];
        }, 
        error => {
          log.debug(`Get container type details error: ${error}`);
        }
      );
  }

}
