import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.style.scss'],
})
export class DashboardComponent implements OnInit {
  
  ngOnInit(): void {
    console.log("Hi, I am here ...");
  }
  
}
