import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Bookmark } from '../models/bookmark';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  bookmarksCollection: AngularFirestoreCollection<Bookmark>;
  bookmarks:Observable<Bookmark[]>;
  bookmarkDoc:AngularFirestoreDocument<Bookmark>;

  constructor(public angularFirestore: AngularFirestore) { 
    this.bookmarksCollection = this.angularFirestore.collection('bookmarks', ref => ref.orderBy('prodname', 'asc'));

    this.bookmarks = this.bookmarksCollection.snapshotChanges().map(changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as Bookmark;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getBookmarks(){
     return this.bookmarks;
   }

   addBookmark(bookmark:Bookmark){
     this.bookmarksCollection.add(bookmark);
   }

   deleteBookmark(bookmark:Bookmark){
     this.bookmarkDoc = this.angularFirestore.doc(`bookmarks/${bookmark.id}`);
     this.bookmarkDoc.delete();
   }

   updateBookmark(bookmark: Bookmark){
     this.bookmarkDoc = this.angularFirestore.doc(`bookmarks/${bookmark.id}`);
     this.bookmarkDoc.update(bookmark);
   }

}
