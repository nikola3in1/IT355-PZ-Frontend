import {Routes} from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { GenreComponent } from './_pages/genre/genre.component';
import { UserComponent } from './_pages/user/user.component';
import { AdminComponent } from './_pages/admin/admin.component';
import { LoginComponent } from './_pages/login/login.component';
import { RegisterComponent } from './_pages/register/register.component';
import { LogoutComponent } from './_components/logout/logout.component';
import { UploadComponent } from './_pages/upload/upload.component';
import { SongComponent } from './_pages/song/song.component';
import { CreatorComponent } from './_pages/creator/creator.component';
import { EditprofileComponent } from './_pages/editprofile/editprofile.component';
import { TopfiveComponent } from './_pages/topfive/topfive.component';
import { SearchResultComponent } from './_pages/search-result/search-result.component';
import { AllgenresComponent } from './_pages/allgenres/allgenres.component';

import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';


export const appRoutes: Routes =[
    { path:'login', component: LoginComponent},
    { path:'register', component: RegisterComponent},
    { path:'profile/edit', component: EditprofileComponent,canActivate:[AuthGuard]},
    { path:'logout', component: LogoutComponent},
    { path:'upload', component: UploadComponent,canActivate:[AuthGuard]},
    { path:'home', component: HomeComponent},
    { path:'top5', component: TopfiveComponent},
    { path:'', component: HomeComponent},
    { path:'creator/:creator', component: CreatorComponent},
    { path:'profile', component: UserComponent, canActivate:[AuthGuard]},
    { path:'admin', component: AdminComponent, canActivate:[AdminGuard]},
    { path:'genre/:genre', component:GenreComponent},
    { path:'creator/:creator/:songName', component:SongComponent},
    { path:'search/:query', component:SearchResultComponent},
    { path:'genres', component:AllgenresComponent}
];