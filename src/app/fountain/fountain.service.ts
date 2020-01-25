import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Fountain } from './fountain.model';

@Injectable({
  providedIn: 'root'
})
export class FountainService {
  constructor(private firestore: AngularFirestore) { }

  getFountains() {
    return this.firestore.collection('fountains').snapshotChanges();
  }

  createFountain(fountain: Fountain) {
    return this.firestore.collection('fountains').add(fountain);
  }

  updateFountain(fountain: Fountain) {
    return this.firestore.doc('fountains/' + fountain.id).update(fountain);
  }

  deleteFountain(fountainID: number) {
    return this.firestore.doc('fountains/' + fountainID).delete();
  }
}
