import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  editState: boolean = false;
  userToEdit: User;


  constructor(public userService: UserService) { }

  ngOnInit() {
     this.userService.getUsers().subscribe(users => {
      //  console.log(users);
       this.users = users;
     });
  }

  deleteUser(event, user: User){
    this.clearState();
    this.userService.deleteUser(user);
  }

  editUser(event, user: User){
    this.editState = true;
    this.userToEdit = user;
  }

  clearState(){
    this.editState = false;
    this.userToEdit = null;
  }

  updateUser(user: User){
    this.userService.updateUser(user);
    this.clearState();
  }

}
