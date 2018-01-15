import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Bookmark } from '../../models/bookmark';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  bookmarks: Bookmark[];
  editState: boolean = false;
  bookmarkToEdit: Bookmark;


  constructor(public userService: UserService) { }

  ngOnInit() {
     this.userService.getBookmarks().subscribe(bookmarks => {
      //  console.log(users);
       this.bookmarks = bookmarks;
     });
  }

  deleteBookmark(event, bookmark: Bookmark){
    this.clearState();
    this.userService.deleteBookmark(bookmark);
  }

  editBookmark(event, bookmark: Bookmark){
    this.editState = true;
    this.bookmarkToEdit = bookmark;
  }

  clearState(){
    this.editState = false;
    this.bookmarkToEdit = null;
  }

  updateBookmark(bookmark: Bookmark){
    this.userService.updateBookmark(bookmark);
    this.clearState();
  }

}
