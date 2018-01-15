import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';

import { UserService } from './services/user.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
