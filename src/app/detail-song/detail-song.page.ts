import {Component, OnInit} from '@angular/core';
import {NavController, PopoverController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {PopoverComponent} from '../components/popover/popover.component';
import {DomSanitizer} from '@angular/platform-browser';
import {PopoverShareComponent} from '../components/popover-share/popover-share.component';
import {Platform} from '@ionic/angular';


@Component({
    selector: 'app-detail-song',
    templateUrl: './detail-song.page.html',
    styleUrls: ['./detail-song.page.scss'],
})
export class DetailSongPage implements OnInit {

    sValue: string;
    oSong: any;
    sPageFather: any;
    aResult: any;
    aSongsFavStorage: any;
    bIsExistFav: boolean;
    sTrustedVideoUrl: any;
    bWebPlatForm: boolean;
    aSongs: any;
    aSongsDataStorageInline: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private navCtrl: NavController,
                public popoverController: PopoverController,
                public toastController: ToastController,
                private domSanitizer: DomSanitizer) {

        this.aSongs = JSON.parse(localStorage.getItem('songsDataStorage'));
        this.aSongsDataStorageInline = JSON.parse(localStorage.getItem('songsDataStorageInline'));

        if (!(this.aSongs !== null && this.aSongs !== ''
            && this.aSongsDataStorageInline !== null && this.aSongsDataStorageInline !== '')) {
            this.router.navigate(['/']);
        }
        this.getSong();
        const sLink = this.oSong.song_link_youtube;
        const aStorage = JSON.parse(localStorage.getItem('songsFavStorage'));
        if (!navigator.onLine) {
            this.sTrustedVideoUrl = '';
        } else {
            this.sTrustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(sLink);
        }
        this.sValue = this.route.snapshot.queryParams.id;
        if (aStorage == null) {
            this.aResult = [];
            this.bIsExistFav = this.checkIsFavExist(this.sValue);
        } else {
            this.aResult = aStorage;
            this.bIsExistFav = this.checkIsFavExist(this.sValue);
        }
        this.bWebPlatForm = document.URL.startsWith('http') || document.URL.startsWith('https');
        //this.bWebPlatForm = false;
    }

    ngOnInit() {
    }

    nl2br(text: string) {
        return text.replace(/\n/g, '<br \/>');
    }

    async presentToast(pos: any, msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: pos,
            cssClass: 'toast-class'
        });
        toast.present();
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            event: ev,
            translucent: true
        });
        return await popover.present();
    }

    async presentPopoverShare(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverShareComponent,
            event: ev,
            translucent: true
        });
        return await popover.present();
    }

    getSong() {
        this.oSong = this.getSongById(this.route.snapshot.queryParams.id);
        this.sPageFather = this.route.snapshot.queryParams.pageFather;
    }

    getSongById(idSong: any) {
        if (this.aSongsDataStorageInline !== null && this.aSongsDataStorageInline !== '') {
            return this.aSongsDataStorageInline.filter((song) => {
                return song.song_id === idSong;
            }) [0];
        } else {
            return this.aSongs.filter((song) => {
                return song.song_id === idSong;
            }) [0];
        }
    }

    addSongOnFav() {
        if (!this.checkIsFavExist(this.sValue)) {
            const aNewFav = [];
            aNewFav.push({value: this.sValue});
            this.bIsExistFav = true;
            this.aSongsFavStorage = aNewFav.concat(this.aResult);
            this.aResult = this.aSongsFavStorage;
            localStorage.setItem('songsFavStorage', JSON.stringify(this.aSongsFavStorage));
            this.presentToast('bottom', 'Tafiditra ao anaty lisitra ireo hira tiana.');
        }
    }

    deleteSongOnFav() {
        if (this.checkIsFavExist(this.sValue)) {
            const aNewStorage = this.removeFavInStorage(this.sValue);
            this.aSongsFavStorage = aNewStorage;
            localStorage.setItem('songsFavStorage', JSON.stringify(this.aSongsFavStorage));
            this.bIsExistFav = false;
            this.presentToast('bottom', 'Voafafa ao anaty lisitra ireo hira tiana.');
        }
    }

    checkIsFavExist(value) {
        for (const oResult  of this.aResult) {
            if (oResult.value === value) {
                return true;
            }
        }
        return false;
    }

    removeFavInStorage(value) {
        let i;
        i = this.aResult.length;
        while (i--) {
            if (this.aResult[i].value === value) {
                this.aResult.splice(i, 1);
            }
        }
        return this.aResult;
    }

    getPage(sPage: string) {
        this.navCtrl.navigateBack('/tabs/' + sPage);
    }

    loadPageSong() {
        if (this.sPageFather === 'song') {
            this.navCtrl.navigateBack('/tabs/song');
        } else if (this.sPageFather === 'favorites') {
            this.navCtrl.navigateBack('/favorites');
        } else {
            this.navCtrl.navigateBack('/tabs/search');
        }
    }
}
