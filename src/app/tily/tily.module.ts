import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { TabsPageModule } from './tabs/tabs.module';
import { HomePage } from '../home/home.page';
import { DetailSongPage } from './detail-song/detail-song.page';
import { AboutPage } from '../about/about.page';
import { FavoritesPage } from '../favorites/favorites.page';
import { LoaderService } from '../services/loader/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from '../services/loader/loader-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Nl2BrPipeModule,
    TabsPageModule
  ],
  declarations: [HomePage, DetailSongPage, AboutPage, FavoritesPage],
  providers : [
    LoaderService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptorService,
        multi: true
    }
  ]
})
export class TilyModule { }
