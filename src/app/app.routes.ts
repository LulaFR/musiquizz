import { Routes } from '@angular/router';
// import { LoginComponent } from './page/views/login/login/login.component';
// import { CallbackComponent } from './page/views/login/callback/callback/callback.component';
import { MenuComponent } from './page/views/menu/menu/menu.component';
import { SearchComponent } from './page/views/search/search/search.component';
// import { SignInComponent } from './page/views/landing-page/sign-in/sign-in.component';
// import { LogInComponent } from './page/views/landing-page/log-in/log-in.component';
import { LandingPageComponent } from './page/views/landing-page/landing-page.component';
import { UserComponent } from './page/views/user/user.component';
import { GamePreparationComponent } from './page/views/search/game-preparation/game-preparation.component';
import { GameComponent } from './page/views/game/game/game.component';
import { ResultsComponent } from './page/views/results/results.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        component: LandingPageComponent
    },
    {
        path: 'menu',
        component: MenuComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'profile',
        component: UserComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'play',
        component: GameComponent
    },
    {
        path: 'results',
        component: ResultsComponent
    },
    {
        path: '**',
        component: LandingPageComponent
    }
];
