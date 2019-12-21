import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SongsService} from './services/songs.service';
import {Network} from '@ionic-native/network/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    aSongsDataStorage: any;
    aSongsDataStorageInline: any;
    aSongsFavStorage: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public servicesSong: SongsService,
        public network: Network
    ) {
        this.aSongsDataStorageInline = localStorage.getItem('songsDataStorageInline');
        this.aSongsDataStorage = localStorage.getItem('songsDataStorage');
        this.aSongsFavStorage = localStorage.getItem('songsFavStorage');
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
        if (!navigator.onLine) {
            if (this.aSongsDataStorage === null || this.aSongsDataStorage === '') {
                this.servicesSong.aGetRemoteJsonData().subscribe((res: any[]) => {
                    localStorage.setItem('songsDataStorage', JSON.stringify(res));
                });
            }
            if (this.aSongsDataStorageInline === null || this.aSongsDataStorageInline === '') {
                this.servicesSong.aGetRemoteJsonData().subscribe((res: any[]) => {
                    localStorage.setItem('songsDataStorageInline', JSON.stringify(res));
                });
            }
        } else {
            this.servicesSong.aGetRemoteOnlineJsonData().subscribe(
                (res) => {
                    localStorage.setItem('songsDataStorageInline', JSON.stringify(res));
                    localStorage.setItem('songsDataStorage', JSON.stringify(res));
                },
                (err) => {
                    if (this.aSongsDataStorage === null || this.aSongsDataStorage === '') {
                        this.servicesSong.aGetRemoteJsonData().subscribe((res: any[]) => {
                            localStorage.setItem('songsDataStorage', JSON.stringify(res));
                        });
                    }
                    if (this.aSongsDataStorageInline === null || this.aSongsDataStorageInline === '') {
                        this.servicesSong.aGetRemoteJsonData().subscribe((res: any[]) => {
                            localStorage.setItem('songsDataStorageInline', JSON.stringify(res));
                        });
                    }
                }
            );
        }
        if (this.aSongsFavStorage === null || this.aSongsFavStorage === '') {
            localStorage.setItem('songsFavStorage', JSON.stringify([]));
        }
    }
}
