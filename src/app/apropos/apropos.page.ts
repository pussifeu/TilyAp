import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-apropos',
    templateUrl: './apropos.page.html',
    styleUrls: ['./apropos.page.scss'],
})
export class AproposPage implements OnInit {

    constructor(private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    loadPageSong() {
        this.navCtrl.navigateBack('/tabs-home/tabs/song');
    }

}
