import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ServicesSongsService} from './services/services-songs.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public servicesSong: ServicesSongsService
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
        this.servicesSong.aGetRemoteJsonData().subscribe((res: any[]) => {
            localStorage.setItem('songsDataStorage', JSON.stringify(res));
        });
    }
}
