import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServicesSongsService} from '../services/services-songs.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    aSongsDataStorage: any;
    aSongsDataStorageInline: any;
    aSongsFavStorage: any;

    constructor(public router: Router,
                public servicesSong: ServicesSongsService) {
        this.aSongsDataStorageInline = localStorage.getItem('songsDataStorageInline');
        this.aSongsDataStorage = localStorage.getItem('songsDataStorage');
        this.aSongsFavStorage = localStorage.getItem('songsFavStorage');
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        let time = 3500;
        const t0 = performance.now();
        this.getAllSongs();
        const t1 = performance.now();
        if (t1 - t0 > time) {
            time = t1 - t0;
        }
        setTimeout(() => {
            this.router.navigate(['tabs-home/tabs/song']);
        }, time);
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
