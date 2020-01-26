import {Component, OnChanges, OnInit, Input, SimpleChanges, TemplateRef} from '@angular/core';
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
  location: Location;
  userLocation: boolean;

  fountainNames: string[] = [];
  addRating: Rating = {
    taste: 0,
    temp: 0,
    press: 0
  };

  public model: any;

  ngOnInit() {
    if (this.homeComponent.isLoaded) {
      this.fountainNames = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.fountains.length; i++) {
        this.fountainNames.push('Fountain ' + this.fountains[i].id);
      }
    }
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.fountainNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)));

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fountains && this.homeComponent.isLoaded) {
      this.fountains.sort((a, b) => (parseInt(a.id, 10) > parseInt(b.id, 10)) ? 1 : -1);
      this.ngOnInit();
    }
  }

  onClickSeeReviews(title: string, longContent) {
    this.fountain = this.fountains.find(o => o.id === title);
    console.log(this.fountain);
    const modalRef = this.homeComponent.modalService.open(longContent, {
      scrollable: true,
      size: 'lg'
    });
  }

  searchBarClickSeeReviews(title: string, longContent) {
    this.fountain = this.fountains.find(o => o.id === title.split(' ')[1]);
    console.log(this.fountain);
    if (this.fountain !== undefined) {
      const modalRef = this.homeComponent.modalService.open(longContent, {
        scrollable: true,
        size: 'lg'
      });
    }
  }

  submitRating() {
    let ratingNum = 1;
    for (const rating in this.fountain.ratings) {
      if (this.fountain.ratings.hasOwnProperty(rating)) {
        ratingNum = ratingNum + 1;
      }
    }
    const ratingName = 'rating' + ratingNum.toString();
    this.fountain.ratings[ratingName] = this.addRating;
    this.homeComponent.firestore.collection('fountains').doc(this.fountain.id).update({
      ratings: this.fountain.ratings
    });
    this.addRating = {
      press: 0,
      taste: 0,
      temp: 0
    };
  }
}

interface Rating {
  temp: number;
  taste: number;
  press: number;
}


