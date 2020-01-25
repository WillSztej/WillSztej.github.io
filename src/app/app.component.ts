import {Component, OnInit} from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-hydrate';
  zoom: Zoom;
  location: Location;
  markers: Marker[];

  ngOnInit() {
    this.location = {
      lat: 40.427444,
      lng: -86.916861
    };
    this.zoom = {
      defzoom: 16,
      minZoom: 15,
      maxZoom: 30
    };
    this.markers = [];
    this.addMarker(this.location);
  }

  addMarker(location: Location) {
    this.markers.push({
      lat: location.lat,
      lng: location.lng
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
}
