import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

    constructor(public router: Router,
                public popoverController: PopoverController) {
    }

    ngOnInit() {
    }

    openFavoritesPage() {
        this.router.navigate(['favorites']);
        this.dismissClick();
    }

    openAproposPage() {
        this.router.navigate(['apropos']);
        this.dismissClick();
    }

    async dismissClick() {
        await this.popoverController.dismiss();
    }
}
