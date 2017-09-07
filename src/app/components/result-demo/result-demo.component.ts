import { Component, OnInit, HostBinding } from '@angular/core';
import { ResizeListenerService } from '../../services/resize-listener/resize-listener.service';
import { ResizeListenerObservable } from '../../helpers/resize-listener';
import { Subscription } from 'rxjs/Rx';

interface Item {
  name: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-result-demo',
  templateUrl: './result-demo.component.html',
  styleUrls: ['./result-demo.component.scss']
})
export class ResultDemoComponent implements OnInit {
  @HostBinding('class.demo-container') classDemoContainer = true;

  protected viewMode: string;
  protected items: Array<Item>;
  protected tableListenerId = 'table-listener';
  protected breakpoints = [
    {
      width: {
        name: 'card',
        class: 'width-xs',
        max: 800
      },
      height: {
        name: '',
        class: '',
        max: 0
      }
    },
    {
      width: {
        name: 'table',
        class: 'width-md',
        min: 801
      },
      height: {
        name: '',
        class: '',
        min: 0
      }
    }
  ];

  private names = [
    'Marc Schmuck',
    'Derrick Lords',
    'Helene Wolfeschlegelstein',
    'Cletus Mcgoldrick',
    'Vilma Rossetti',
    'Margo Levalley',
    'Fleta Bronstein',
    'Bulah Blanks',
    'Cora Hendry',
    'Fawn Sardina',
    'Maryann Rhine',
    'Jennell Harada',
    'Lin Bodie',
    'Nga Harvin',
    'Rudolf Weekly',
    'Ramon Hauser'
  ];
  private descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et vulputate metus.
      Nunc eget libero nec dolor lobortis vulputate. Suspendisse nisl odio, fringilla a augue eu,
      finibus sollicitudin nunc. Aliquam condimentum eu mi a tempor. Maecenas tristique hendrerit mauris.`,
    `Mauris maximus sem sit amet consequat varius. Quisque vitae auctor metus. Donec et augue erat.
      Suspendisse dolor ante, luctus vitae est vel, cursus mollis nibh. Nam pulvinar placerat imperdiet.`,
      `Sed sed rutrum est. In hac habitasse platea dictumst.`
  ];
  private status = [
    'Working',
    'Sick leave',
    'Vacation'
  ];
  private tableResizeListener: ResizeListenerObservable;
  private tableListenerSubscription: Subscription;

  constructor(private resizeListenerService: ResizeListenerService) {
    this.items = [];

    for (let i = 0; i < this.names.length; i++) {
      this.items.push({
        name: this.names[i],
        description: this.getRandomDescription(),
        status: this.getRandomStatus()
      });
    }
  }

  ngOnInit() {
    this.resizeListenerService.getListener(this.tableListenerId).then((resizeListener: ResizeListenerObservable) => {
      this.tableResizeListener = resizeListener;
      this.tableListenerSubscription = resizeListener.subscribe((dto: any) => {
        this.viewMode = dto.width ? dto.width.name : 'table';
      });
    });
  }

  private getRandomDescription(): string {
    return this.descriptions[Math.round(Math.random() * (this.descriptions.length - 1))];
  }

  private getRandomStatus(): string {
    return this.status[Math.round(Math.random() * (this.status.length - 1))];
  }
}
