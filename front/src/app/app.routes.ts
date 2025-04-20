import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrPageComponent } from './pages/registr-page/registr-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import {EventPageComponent} from './pages/event-page/event-page.component';
import { canActivateAuth } from './Services/auth/auth.guard';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { EventModerateComponent } from './pages/event-moderate/event-moderate.component';
import { NewsModerateComponent } from './pages/news-moderate/news-moderate.component';
import { OrganizationVerificationComponent } from './pages/organization-verification/organization-verification.component';
import { UsersModerateComponent } from './pages/users-moderate/users-moderate.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { ProfileEventsComponent } from './pages/profile-events/profile-events.component';
import { ProfileNewsComponent } from './pages/profile-news/profile-news.component';
import { ChatComponent } from './pages/chat/chat.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { CreateEventPageComponent } from './pages/create-event-page/create-event-page.component';
import { CreateNewsComponent } from './pages/create-news/create-news.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { UserEventsPageComponent } from './pages/user-events-page/user-events-page.component';
import { PrivacySettingsPageComponent } from './pages/privacy-settings-page/privacy-settings-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent},
    {
         path: 'profile', component: SideBarComponent, children:[
        { path:'', component: ProfilePageComponent},
        { path:'moderation/events', component: EventModerateComponent},
        { path:'moderation/news', component: NewsModerateComponent},
        {path: 'verification/org', component: OrganizationVerificationComponent},
        {path: 'moderation/users', component: UsersModerateComponent},
        {path: 'org/events', component: ProfileEventsComponent},
        {path: 'user/events', component: UserEventsPageComponent},
        {path: 'user/settings', component: PrivacySettingsPageComponent},
        {path: 'org/news', component: ProfileNewsComponent},
        {path: 'chats', component: ChatComponent},
        {path:'edit', component: EditProfilePageComponent},
        {path: 'org/events/create/event', component: CreateEventPageComponent},
        {path: 'org/news/create/news', component: CreateNewsComponent},
        {path: 'friends', component: FriendsPageComponent}
    ],canActivate:[canActivateAuth]},
    { path: 'event/:id', component: EventPageComponent, canActivate:[canActivateAuth]},
    

//     {path: 'login', component: LoginPageComponent},
//     {path: 'reg', component: RegistrPageComponent}
//     {path: '', component: HomePageComponent, children:[
//         { path: 'profile', component: ProfilePageComponent},
//         { path: 'event/:id', component: EventPageComponent },
//     ],
//     canActivate:[canActivateAuth]
// },

    {path: 'login', component: LoginPageComponent},
    {path: 'reg', component: RegistrPageComponent},
    {path:'recovery-password', component: RecoverPasswordComponent}
];
