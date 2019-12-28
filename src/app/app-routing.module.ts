import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailSongPage } from './tily/detail-song/detail-song.page';
import { AboutPage } from './about/about.page';
import { FavoritesPage } from './favorites/favorites.page';
import { HomePage } from './home/home.page';
import { SongsResolverService } from './services/resolvers/songs-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    resolve: { songResolver: SongsResolverService },
  },
  { path: 'detail-song', component: DetailSongPage },
  { path: 'about', component: AboutPage },
  { path: 'favorites', component: FavoritesPage }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
