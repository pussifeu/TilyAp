import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  private subscription: Subscription;
  show: boolean;

  constructor(private loaderService: LoaderService) {
    this.show = false;
   }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: any) => {
        this.show = state.show;
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
