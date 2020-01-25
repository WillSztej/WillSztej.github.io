import {Component, OnInit} from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {environment} from '../environments/environment';
import {Fountain} from './fountain/fountain.model';
import {FountainService} from './fountain/fountain.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

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
  markers: Marker[] = [];
  style = environment.mainMapStyle;

  constructor(private fountainService: FountainService, private fireStorage: AngularFireStorage) { }

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

  onFountainClicked(title: string) {
    this.fireStorage.ref(this.fountains.find(o => o.id === title).picture).getDownloadURL().subscribe(url => {
      console.log(url);
      console.log('pulling up image');
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
