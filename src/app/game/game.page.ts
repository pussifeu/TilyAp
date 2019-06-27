import {Component} from '@angular/core';
import {PopoverComponent} from '../components/popover/popover.component';
import {PopoverController} from '@ionic/angular';
// import {EmailComposer} from '@ionic-native/email-composer';


@Component({
    selector: 'app-tab2',
    templateUrl: 'game.page.html',
    styleUrls: ['game.page.scss']
})
export class GamePage {

    constructor(
        public popoverCtrl: PopoverController,) {
        // this.sendMail();
    }

    async presentPopover(even: any) {
        const popover = await this.popoverCtrl.create({
            component: PopoverComponent,
            event: even,
            translucent: true
        });
        return await popover.present();
    }
    /* sendMail() {
        this.emailComposer.isAvailable().then((available: boolean) => {
            if (available) {
                console.log('here');
            }
        });
        const email = {
            to: 'herinjaka.rakotoarivony@gmail.com',
            attachments: [],
            subject: 'Cordova Icons',
            body: 'How are you? Nice greetings from Leipzig',
            isHtml: true
        };
        this.emailComposer.open(email);
    } */
}
