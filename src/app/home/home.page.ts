import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(public router: Router) {
    }
    ngOnInit(): void {
        setTimeout(() => {
            this.router.navigate(['/tabs/song']);
        }, 1000 )
    }
}
