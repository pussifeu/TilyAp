import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'song',
        children: [
          {
            path: '',
            loadChildren: '../song/song.module#SongPageModule'
          }
        ]
      },
      {
        path: 'game',
        children: [
          {
            path: '',
            loadChildren: '../game/game.module#GamePageModule'
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: '../search/search.module#SearchPageModule'
          }
        ]
      },
      {
        path: 'tabs-home',
        redirectTo: '/tabs/song',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tabs-home',
    redirectTo: '/tabs/song',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
