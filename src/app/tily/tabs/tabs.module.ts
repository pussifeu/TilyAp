import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { ComponentsModule } from '../../components/components.module';
import { SearchPage } from '../search/search.page';
import { SongPage } from '../song/song.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage, SongPage, SearchPage]
})
export class TabsPageModule {}
