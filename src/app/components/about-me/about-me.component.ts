import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  @HostBinding('class.demo-container') classDemoContainer = true;

  constructor() { }

  ngOnInit() {
  }

}
