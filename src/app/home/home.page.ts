import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServicesSongsService} from '../services/services-songs.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(public router: Router,
                public servicesSong: ServicesSongsService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['tabs-home/tabs/song']);
            this.getAllSongs();
        }, 3500);
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.router.navigate(['tabs-home/tabs/song']);
            this.getAllSongs();
        }, 3500);
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
    }
}
