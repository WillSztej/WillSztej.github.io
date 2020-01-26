import { Component, OnChanges, OnInit, Input, SimpleChanges} from '@angular/core';
import { HomeMainComponent } from '../home-main/home-main.component';
import {Fountain} from '../../fountain/fountain.model';
import {FountainService} from '../../fountain/fountain.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {

  @Input()
  fountains: Fountain[];
  fountain: Fountain;

  constructor(private homeComponent: HomeMainComponent,
              private fountainService: FountainService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fountains && this.homeComponent.isLoaded) {
      this.fountains.sort((a, b) => (parseInt(a.id, 10) > parseInt(b.id, 10)) ? 1 : -1);
      this.ngOnInit();
    }
  }

  onClickSeeReviews(title: string, longContent) {
    this.fountain = this.fountains.find(o => o.id === title);
    const modalRef = this.homeComponent.modalService.open(longContent, {
      scrollable: true,
      size: 'lg'
    });
  }

  searchSort() {
    console.log('function starting');
    // Declare variables
    let input;
    let filter;
    let ul;
    let li;
    let a;
    let i;
    let txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('list');
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName('a')[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].class = 'hide';
      } else {
        li[i].class = 'hide';
      }
    }
  }
}



