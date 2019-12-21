import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {PopoverComponent} from '../../components/popover/popover.component';
import {PopoverController} from '@ionic/angular';
import {SongsService} from '../../services/songs.service';


@Component({
    selector: 'app-song',
    templateUrl: 'song.page.html',
    styleUrls: ['song.page.scss']
})
export class SongPage {
    value: any;
    aSongs: any;
    aFilterSongs = [];
    aSongsDataStorageInline: any;
    constructor(public router: Router,
                public servicesSong: SongsService,
                public popoverCtrl: PopoverController) {
        this.value = '';
    }

    ionViewDidEnter() {
        this.aSongsDataStorageInline = localStorage.getItem('songsDataStorageInline');
        this.getAllSongs();
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
        if (this.aSongsDataStorageInline !== null && this.aSongsDataStorageInline !== '') {
            this.aSongs = JSON.parse(localStorage.getItem('songsDataStorageInline'));
        } else {
            this.aSongs = JSON.parse(localStorage.getItem('songsDataStorage'));
        }
    }

    getSongByTittle(event: any) {
        this.getAllSongs();
        this.searchValueInSong(event);
    }

    searchValueInSong(event: any) {
        this.aFilterSongs = this.aSongs.filter((song) => {
            return (song.song_tittle.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) ||
                (song.s_song_contents.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
        });
    }
}
