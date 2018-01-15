import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Bookmark } from '../../models/Bookmark';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  bookmark: Bookmark = {
    prodname: '',
    url: '',
    price: ''
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.bookmark.prodname != '' && this.bookmark.url != '' && this.bookmark.price != ''){
      this.userService.addBookmark(this.bookmark);
      this.bookmark.prodname = '';
      this.bookmark.url = '';
      this.bookmark.price = '';
    }
  }

}
