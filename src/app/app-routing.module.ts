import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailSongPage } from './detail-song/detail-song.page';
import { AboutPage } from './about/about.page';
import { FavoritesPage } from './favorites/favorites.page';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: '', component : HomePage},
  { path: 'detail-song', component: DetailSongPage },
  { path: 'about', component: AboutPage},
  { path: 'favorites', component: FavoritesPage }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
