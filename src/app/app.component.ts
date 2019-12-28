import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    aSongsDataStorage: any;
    aSongsDataStorageInline: any;
    aSongsFavStorage: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router
    ) {
        this.initializeApp();
        this.backButtonEvent();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.router.navigate(["/home"]);
        });
    }

    ngOnInit(): void {
        this.router.navigate(["/home"]);
    }

    backButtonEvent() {
        this.platform.backButton.subscribe(async () => {
            if (this.router.url == "/tabs/song" || this.router.url == "/tabs/search") {
                navigator['app'].exitApp();
            }
        })
    }
}
