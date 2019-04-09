import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpService: HttpClient) { }

//get request
getCompanyById(){
    return this.httpService.get('/api/company/{id}');
  }
}
