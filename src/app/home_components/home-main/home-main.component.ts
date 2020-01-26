import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {environment} from 'src/environments/environment';
import {Fountain} from 'src/app/fountain/fountain.model';
import {FountainService} from 'src/app/fountain/fountain.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})

export class HomeMainComponent implements OnInit {
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
  userLocation = false;
  fountains: Fountain[];
  fountain: Fountain;
  markers: Marker[] = [];
  style = environment.mainMapStyle;
  isLoaded = false;
  addRating: Rating = {
    press: 0,
    taste: 0,
    temp: 0
  };
  userMarkerTitle = 'Current Location';
  icon = {
    url: 'https://firebasestorage.googleapis.com/v0/b/web-hydrate.appspot.' +
      'com/o/blue-dot.png?alt=media&token=01e35e36-25f3-4143-9b1c-300038f2864e',
    scaledSize: {
      width: 41,
      height: 41
    }
  };


  constructor(private fountainService: FountainService,
              public firestore: AngularFirestore,
              public modalService: NgbModal) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition( pos => {
        this.location.lng = +pos.coords.longitude;
        this.location.lat = +pos.coords.latitude;
        this.userLocation = true;
      });
    }
  }

  ngOnInit() {
    this.fountainService.getFountains().subscribe(data => {
      this.fountains = data.map(e => {
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

  submitRating() {
    let ratingNum = 1;
    for (const rating in this.fountain.ratings) {
      if (this.fountain.ratings.hasOwnProperty(rating)) {
        ratingNum = ratingNum + 1;
      }
    }
    const ratingName = 'rating' + ratingNum.toString();
    this.fountain.ratings[ratingName] = this.addRating;
    this.firestore.collection('fountains').doc(this.fountain.id).update({
      ratings: this.fountain.ratings
    });
    this.addRating = {
      press: 0,
      taste: 0,
      temp: 0
    };
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2 * Math.sin(dLon / 2))
  ;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  d *= 0.621371;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
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

interface Rating {
  press: number;
  taste: number;
  temp: number;
}

