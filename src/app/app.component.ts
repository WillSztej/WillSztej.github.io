import {Component, OnInit} from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {environment} from '../environments/environment';
import {Fountain} from './fountain/fountain.model';
import {FountainService} from './fountain/fountain.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-hydrate';
  zoom: Zoom = {
    defzoom: 16,
    minZoom: 15,
    maxZoom: 30
  };
  location: Location = {
    lat: 40.427444,
    lng: -86.916861
  };
  fountains: Fountain[];
  fountain: Fountain;
  markers: Marker[] = [];
  style = environment.mainMapStyle;
  isLoaded = false;

  constructor(private fountainService: FountainService,
              public fireStorage: AngularFireStorage,
              public modalService: NgbModal) { }

  ngOnInit() {
    this.fountainService.getFountains().subscribe(data => {
      this.fountains = data.map(e => {
        console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id.toString(),
          ...e.payload.doc.data()
        } as Fountain;
      });
      for (const fountain of this.fountains) {
        this.addMarker(fountain.location.lat, fountain.location.lng, fountain.id);
      }
      this.isLoaded = true;
    });
  }

  create(fountain: Fountain) {
    this.fountainService.createFountain(fountain);
  }

  update(fountain: Fountain) {
    this.fountainService.updateFountain(fountain);
  }

  delete(fountainID: string) {
    this.fountainService.deleteFountain(fountainID);
  }

  addMarker(latitude: number, longitude: number, name: string) {
    this.markers.push({
      lat: latitude,
      lng: longitude,
      title: name
    });
  }

  onFountainClicked(title: string, longContent) {
    this.fountain = this.fountains.find(o => o.id === title);
    console.log(this.fountain);
    const modalRef = this.modalService.open(longContent, {
      scrollable: true,
      size: 'lg'
    });
  }
}

interface Location {
  lat: number;
  lng: number;
}

interface Zoom {
  defzoom: number;
  minZoom: number;
  maxZoom: number;
}

interface Marker {
  lat: number;
  lng: number;
  title: string;
}
