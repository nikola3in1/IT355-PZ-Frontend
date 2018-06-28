import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { AudioComponent } from './_components/audio/audio.component';
import { AdminComponent } from './_pages/admin/admin.component';
import { LoginComponent } from './_pages/login/login.component';
import { HomeComponent } from './_pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { ContentService } from './_services/content.service';
import { PlayerService } from './_services/player.service'; 
 
import { UserComponent } from './_pages/user/user.component';
import { LogoutComponent } from './_components/logout/logout.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { SearchComponent } from './_components/search/search.component';
import { appRoutes } from './routes';
import { UploadComponent } from './_pages/upload/upload.component';
import { GenresComponent } from './_components/genres/genres.component';
import { FooterComponent } from './_components/footer/footer.component';
import { GenreComponent } from './_pages/genre/genre.component';
import { PlayerComponent } from './_components/player/player.component';
import { SongComponent } from './_pages/song/song.component';
import { RegisterComponent } from './_pages/register/register.component';
import { EditprofileComponent } from './_pages/editprofile/editprofile.component';
import { AdminReportComponent } from './_components/admin-report/admin-report.component';
import { CreatorComponent } from './_pages/creator/creator.component';
import { TopfiveComponent } from './_pages/topfive/topfive.component';
import { SearchResultComponent } from './_pages/search-result/search-result.component';
import { AdminGenreComponent } from './_components/admin-genre/admin-genre.component';
import { AdminRemoveComponent } from './_components/admin-remove/admin-remove.component';
import { AllgenresComponent } from './_pages/allgenres/allgenres.component';
import { SearchBarComponent } from './_components/search-bar/search-bar.component';
import { PaypalComponent } from './_components/paypal/paypal.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioComponent,
    LoginComponent,
    LogoutComponent,    
    HomeComponent,
    UserComponent,
    AdminComponent,
    NavbarComponent,
    SearchComponent,
    UploadComponent,
    GenresComponent,
    FooterComponent,
    GenreComponent,
    PlayerComponent,
    SongComponent,
    RegisterComponent,
    EditprofileComponent,
    AdminReportComponent,
    CreatorComponent,
    TopfiveComponent,
    SearchResultComponent,
    AdminGenreComponent,
    AdminRemoveComponent,
    AllgenresComponent,
    SearchBarComponent,
    PaypalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [AuthService,UserService,ContentService,PlayerService,AuthGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
