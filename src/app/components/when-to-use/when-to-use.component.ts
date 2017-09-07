import { Component, OnInit, HostBinding } from '@angular/core';

interface Item {
  name: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-when-to-use',
  templateUrl: './when-to-use.component.html',
  styleUrls: ['./when-to-use.component.scss']
})
export class WhenToUseComponent implements OnInit {
  @HostBinding('class.demo-container') classDemoContainer = true;

  protected items: Array<Item>;

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
  ]

  private status = [
    'Working',
    'Sick leave',
    'Vacation'
  ]

  constructor() {
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
  }

  private getRandomDescription(): string {
    return this.descriptions[Math.round(Math.random() * (this.descriptions.length - 1))];
  }

  private getRandomStatus(): string {
    return this.status[Math.round(Math.random() * (this.status.length - 1))];
  }

}
