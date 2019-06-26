import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {Nl2BrPipeModule} from 'nl2br-pipe';
import { IonicModule } from '@ionic/angular';

import { DetailSongPage } from './detail-song.page';
import {ComponentsModule} from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: DetailSongPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    Nl2BrPipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailSongPage]
})
export class DetailSongPageModule {}
