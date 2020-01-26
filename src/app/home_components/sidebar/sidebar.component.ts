import { Component, OnChanges, OnInit, Input, SimpleChanges} from '@angular/core';
import { HomeMainComponent } from '../home-main/home-main.component';
import {Fountain} from '../../fountain/fountain.model';
import {FountainService} from '../../fountain/fountain.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {

  constructor(private homeComponent: HomeMainComponent,
              private fountainService: FountainService) { }

  @Input()
  fountains: Fountain[];
  fountain: Fountain;

  fountainNames: string[] = [];

  public model: any;

  ngOnInit() {
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.fountainNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fountains && this.homeComponent.isLoaded) {
      this.fountains.sort((a, b) => (parseInt(a.id, 10) > parseInt(b.id, 10)) ? 1 : -1);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.fountains.length; i++) {
        this.fountainNames.push('Fountain ' + this.fountains[i].id);
      }
      console.log(this.fountainNames)
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

}



