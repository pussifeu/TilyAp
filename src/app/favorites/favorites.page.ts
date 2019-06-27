import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PopoverComponent} from '../components/popover/popover.component';
import {NavController, PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

    aSongsStorage: any;
    aSongs: any;
    aStorage: any;

    constructor(public router: Router,
                public popoverCtrl: PopoverController,
                private navCtrl: NavController) {
        this.aSongs = new Array();
        this.aStorage = new Array();
        this.aSongsStorage = new Array();
    }


    ionViewDidEnter() {
        this.aSongs = JSON.parse(localStorage.getItem('songsDataStorage'));
        this.aStorage = JSON.parse(localStorage.getItem('songsFavStorage'));
        this.aSongsStorage = new Array();
        this.getSongsFavorites();
    }

    ngOnInit() {
    }

    async presentPopover(even: any) {
        const popover = await this.popoverCtrl.create({
            component: PopoverComponent,
            event: even,
            translucent: true
        });
        return await popover.present();
    }

    getSongsFavorites() {
        for (const oSongs of this.aSongs) {
            for (const oStorage of this.aStorage) {
                if (oStorage.value === oSongs.song_id) {
                    this.aSongsStorage.push(oSongs);
                }
            }
        }
    }

    getPage(sPage: string) {
        this.navCtrl.navigateBack('/tabs-home/tabs/' + sPage);
    }

    loadPageDetailSong(idSong: any) {
        const navigationExtras = {
            queryParams: {
                id: idSong,
                pageFather: 'favorites'
            }
        };
        this.router.navigate(['detail-song'], navigationExtras);
    }
}
