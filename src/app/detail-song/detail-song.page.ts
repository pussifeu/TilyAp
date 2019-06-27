import {Component, OnInit} from '@angular/core';
import {NavController, PopoverController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {PopoverComponent} from '../components/popover/popover.component';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import domtoimage from 'dom-to-image';


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
    songsFavStorage: any;
    bIsExistFav: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private navCtrl: NavController,
                public popoverController: PopoverController,
                private socialSharing: SocialSharing,
                public toastController: ToastController) {
        this.getSong();
        const aStorage = JSON.parse(localStorage.getItem('songsFavStorage'));
        this.sValue = this.route.snapshot.queryParams.id;
        if (aStorage == null) {
            this.aResult = new Array();
            this.bIsExistFav = this.checkIsFavExist(this.sValue);
        } else {
            this.aResult = aStorage;
            this.bIsExistFav = this.checkIsFavExist(this.sValue);
        }
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

    async shareFacebook() {
        const node = document.getElementById('ion-content-dom');
        domtoimage.toPng(node)
            .then((dataUrl) => {
                this.socialSharing.shareViaFacebook(null, dataUrl, null).then(
                    () => {
                    }).catch((e) => {
                    }
                );
            })
            .catch((error) => {
                console.error('oops, something went wrong!', error);
            });
    }

    getSong() {
        this.oSong = this.getSongById(this.route.snapshot.queryParams.id);
        this.sPageFather = this.route.snapshot.queryParams.pageFather;
    }

    getSongById(idSong: any) {
        const aSongs = JSON.parse(localStorage.getItem('songsDataStorage'));
        return aSongs.filter((song) => {
            return song.song_id === idSong;
        }) [0];
    }

    addSongOnFav() {
        if (!this.checkIsFavExist(this.sValue)) {
            const aNewFav = new Array();
            aNewFav.push({value: this.sValue});
            this.bIsExistFav = true;
            this.songsFavStorage = aNewFav.concat(this.aResult);
            this.aResult = this.songsFavStorage;
            localStorage.setItem('songsFavStorage', JSON.stringify(this.songsFavStorage));
            this.presentToast('bottom', 'Tafiditra ao anaty lisitra ireo hira tiana.');
        }
    }

    deleteSongOnFav() {
        if (this.checkIsFavExist(this.sValue)) {
            const aNewStorage = this.removeFavInStorage(this.sValue);
            this.songsFavStorage = aNewStorage;
            localStorage.setItem('songsFavStorage', JSON.stringify(this.songsFavStorage));
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
        this.navCtrl.navigateBack('/tabs-home/tabs/' + sPage);
    }

    loadPageSong() {
        if (this.sPageFather === 'song') {
            this.navCtrl.navigateBack('/tabs-home/tabs/song');
        } else if (this.sPageFather === 'favorites') {
            this.navCtrl.navigateBack('/favorites');
        } else {
            this.navCtrl.navigateBack('/tabs-home/tabs/search');
        }
    }
}
