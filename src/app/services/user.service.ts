import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  users:Observable<User[]>;
  userDoc:AngularFirestoreDocument<User>;

  constructor(public angularFirestore: AngularFirestore) { 
    // this.users = this.angularFirestore.collection('users').valueChanges();

    this.usersCollection = this.angularFirestore.collection('users', ref => ref.orderBy('name', 'asc'));

    this.users = this.usersCollection.snapshotChanges().map(changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getUsers(){
     return this.users;
   }

   addUser(user:User){
     this.usersCollection.add(user);
   }

   deleteUser(user:User){
     this.userDoc = this.angularFirestore.doc(`users/${user.id}`);
     this.userDoc.delete();
   }

   updateUser(user: User){
     this.userDoc = this.angularFirestore.doc(`users/${user.id}`);
     this.userDoc.update(user);
   }

}
