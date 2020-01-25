import { Component, OnInit } from '@angular/core';
import { FountainService } from '../fountain/fountain.service';
import { Fountain } from '../fountain/fountain.model';

@Component({
  selector: 'app-fountain-test',
  templateUrl: './fountain-test.component.html',
  styleUrls: ['./fountain-test.component.css']
})
export class FountainTestComponent implements OnInit {

  fountains: Fountain[];
  constructor(private fountainService: FountainService) { }

  ngOnInit() {
    this.fountainService.getFountains().subscribe(data => {
      this.fountains = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Fountain;
      });
    });
  }

  create(fountain: Fountain) {
    this.fountainService.createFountain(fountain);
  }

  update(fountain: Fountain) {
    this.fountainService.updateFountain(fountain);
  }

  delete(fountainID: number) {
    this.fountainService.deleteFountain(fountainID);
  }
}
