import {Component, OnInit} from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import domtoimage from 'dom-to-image';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-popover-share',
    templateUrl: './popover-share.component.html',
    styleUrls: ['./popover-share.component.scss'],
})
export class PopoverShareComponent implements OnInit {

    constructor(
        private socialSharing: SocialSharing,
        public popoverController: PopoverController) {
    }

    ngOnInit() {
    }

    async socialSharingFnc(sType: string) {
        const node = document.getElementById('ion-content-dom');
        domtoimage.toPng(node)
            .then((dataUrl) => {
                if (sType === 'fb') {
                    this.socialSharing.shareViaFacebook(null, dataUrl, null).then(
                        () => {
                        }).catch((e) => {
                        }
                    );
                }
                if (sType === 'messenger') {
                    this.socialSharing.shareVia('com.facebook.orca', '', '', dataUrl, null).then(
                        () => {
                        }).catch((e) => {
                        }
                    );
                }

            })
            .catch((error) => {
                console.error('oops, something went wrong!', error);
            });

        this.dismissClick();
    }

    async dismissClick() {
        await this.popoverController.dismiss();
    }
}
