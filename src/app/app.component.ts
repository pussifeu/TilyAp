import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ServicesSongsService} from './services/services-songs.service';
import {Network} from '@ionic-native/network/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public servicesSong: ServicesSongsService,
        public network: Network
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.getAllSongs();
        });
    }

    getAllSongs() {
        const aSongsDataStorageInline = localStorage.getItem('songsDataStorageInline');
        if (!navigator.onLine) {
            this.servicesSong.aGetRemoteJsonData().subscribe((res: any[]) => {
                if (aSongsDataStorageInline !== null && aSongsDataStorageInline !== '') {
                    localStorage.setItem('songsDataStorageInline', aSongsDataStorageInline);
                } else {
                    localStorage.setItem('songsDataStorage', JSON.stringify(res));
                }
            });
        } else {
            this.servicesSong.aGetRemoteOnlineJsonData().subscribe(
                (res) => {
                    localStorage.setItem('songsDataStorageInline', JSON.stringify(res));
                },
                (err) => {
                    this.servicesSong.aGetRemoteJsonData().subscribe((res: any[]) => {
                        if (aSongsDataStorageInline !== null && aSongsDataStorageInline !== '') {
                            localStorage.setItem('songsDataStorageInline', aSongsDataStorageInline);
                        } else {
                            localStorage.setItem('songsDataStorage', JSON.stringify(res));
                        }
                    });
                });
        }
        localStorage.setItem('songsFavStorage', JSON.stringify([]));
    }
}
