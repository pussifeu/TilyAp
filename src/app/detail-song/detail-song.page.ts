import {Component, OnInit} from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {PopoverComponent} from '../components/popover/popover.component';


@Component({
    selector: 'app-detail-song',
    templateUrl: './detail-song.page.html',
    styleUrls: ['./detail-song.page.scss'],
})
export class DetailSongPage implements OnInit {
    oSong: any;
    sPageFather: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private navCtrl: NavController,
                public popoverCtrl: PopoverController) {
        this.getSong();
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

    getSong() {
        this.oSong = this.getSongById(this.route.snapshot.queryParams.id);
        this.sPageFather = this.route.snapshot.queryParams.pageFather;
    }

    nl2br(text: string) {
        return text.replace(/\n/g, '<br \/>');
    }

    getSongById(idSong: any) {
        const aSongs = JSON.parse(localStorage.getItem('songsDataStorage'));
        return aSongs.filter((song) => {
            return song.song_id === idSong;
        }) [0];
    }

    loadPageSong() {
        if (this.sPageFather === 'song') {
            this.navCtrl.navigateBack('/tabs-home/tabs/song');
        } else {
            this.navCtrl.navigateBack('/tabs-home/tabs/search');
        }
    }
}
