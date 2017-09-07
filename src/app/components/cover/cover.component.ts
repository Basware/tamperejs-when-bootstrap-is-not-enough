import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {
  @HostBinding('class.demo-container') classDemoContainer = true;

  constructor() { }

  ngOnInit() {
  }

}
