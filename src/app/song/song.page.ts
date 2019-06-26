import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {PopoverComponent} from '../components/popover/popover.component';
import {PopoverController} from '@ionic/angular';


@Component({
    selector: 'app-tab1',
    templateUrl: 'song.page.html',
    styleUrls: ['song.page.scss']
})
export class SongPage {
    value: any;
    aSongs: any;
    aFilterSongs = [];

    constructor(public router: Router,
                public popoverCtrl: PopoverController) {
        this.value = '';
        this.getAllSongs();
    }

    ionViewDidEnter() {
        this.aFilterSongs = this.aSongs;
    }

    async presentPopover(even: any) {
        const popover = await this.popoverCtrl.create({
            component: PopoverComponent,
            event: even,
            translucent: true
        });
        return await popover.present();
    }

    loadPageDetailSong(idSong: any) {
        const navigationExtras = {
            queryParams: {
                id: idSong,
                pageFather: 'song'
            }
        };
        this.router.navigate(['detail-song'], navigationExtras);
    }

    getAllSongs() {
        this.aSongs = JSON.parse(localStorage.getItem('songsDataStorage'));
    }

    getSongByTittle(event: any) {
        this.getAllSongs();
        this.searchValueInSong(event);
    }

    searchValueInSong(event: any) {
        this.aFilterSongs = this.aSongs.filter((song) => {
            return song.song_tittle.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
        });
    }

}
