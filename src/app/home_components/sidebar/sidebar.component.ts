import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import {Fountain} from '../../fountain/fountain.model';
import {FountainService} from '../../fountain/fountain.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() appC: AppComponent;
  @Input('fountains') fountains: Fountain[];
  fountain: Fountain;
  isLoaded = false;

  constructor(private appComponent: AppComponent,
              private fountainService: FountainService) { }

  ngOnInit() {
  }

  onClickSeeReviews(title: string, longContent) {
    this.fountain = this.fountains.find(o => o.id === title);
    const modalRef = this.appComponent.modalService.open(longContent, {
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



