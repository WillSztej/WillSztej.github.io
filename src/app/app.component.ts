import {Component, OnInit} from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-hydrate';
  lat = 40.427444;
  lng = -86.916861;
  zoom = 16;
  minZoom = 15;
  maxZoom = 30;

  ngOnInit(): void {
  }
}
