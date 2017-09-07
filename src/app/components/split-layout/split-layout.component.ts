import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-split-layout',
  templateUrl: './split-layout.component.html',
  styleUrls: ['./split-layout.component.scss'],
  animations: [
    trigger('wider', [
      state('1', style({
        'flex-grow': '1'
      })),
      state('0', style({
        'flex-grow': '0.5'
      })),
      transition('0 <=> 1', animate('300ms ease-out'))
    ])
  ]
})
export class SplitLayoutComponent implements OnInit {
  protected isWide: boolean;
  constructor() {
    this.isWide = true;
  }

  ngOnInit() {
  }

  protected toggleWide() {
    this.isWide = !this.isWide;
  }

}
