import {Component, OnInit} from '@angular/core';
import {ServicesSongsService} from '../services/services-songs.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(public servicesSong: ServicesSongsService,
                public router: Router) {
        this.getAllSongs();
    }

    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['tabs-home/tabs/song']);
        }, 3500);
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.router.navigate(['tabs-home/tabs/song']);
        }, 3500);
    }

    getAllSongs() {
        this.servicesSong.aGetRemoteJsonData().subscribe((res: any[]) => {
            localStorage.setItem('songsDataStorage', JSON.stringify(res));
        });
    }
}
