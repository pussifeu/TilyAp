import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SongPage} from './song.page';
import {ComponentsModule} from '../components/components.module';
import {ServicesSongsService} from '../services/services-songs.service';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        RouterModule.forChild([{path: '', component: SongPage}])
    ],
    declarations: [SongPage],
    providers: [ServicesSongsService]
})
export class SongPageModule {
}
