import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'tabs-home', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'detail-song', loadChildren: './detail-song/detail-song.module#DetailSongPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'apropos', loadChildren: './apropos/apropos.module#AproposPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
