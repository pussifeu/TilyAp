import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../components/popover/popover.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    value: any;

    constructor(public router: Router,
                public alertController: AlertController,
                public popoverCtrl: PopoverController) {
        this.value = '';
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.value = '';
    }

    changeValue(event: any) {

    }

    saveValue(event: any) {
        this.value = event;
        const idSong = parseInt(this.value);
        const navigationExtras = {
            queryParams: {
                id: idSong,
                pageFather: 'search'
            }
        };
        if (this.getSongById(idSong) !== undefined) {
            this.router.navigate(['detail-song'], navigationExtras);
        } else {
            this.openAlert();
        }
    }

    async presentPopover(even: any) {
        const popover = await this.popoverCtrl.create({
            component: PopoverComponent,
            event: even,
            translucent: true
        });
        return await popover.present();
    }

    async openAlert() {
        const alert = await this.alertController.create({
            header: '',
            subHeader: this.value === '' ? 'Manorata laharana marina azafady' : 'Tsy misy ny hira laharana faha ' + this.value,
            buttons: ['OK']
        });
        alert.present();
    }

    getSongById(idSong: any) {
        const aSongs = JSON.parse(localStorage.getItem('songsDataStorage'));
        return aSongs.filter((song) => {
            return song.song_number === idSong;
        }) [0];
    }
}
