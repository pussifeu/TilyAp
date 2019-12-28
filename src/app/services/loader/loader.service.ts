import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {
  isLoading = false;
  loading: HTMLIonLoadingElement;
  load: boolean = false;
  constructor(public loadingController: LoadingController) { }

  async show(): Promise<boolean> {
    this.loading = await this.loadingController.create({
      cssClass: 'custom-loader-class',
      spinner: 'crescent',
      duration: 1000
    });
    this.loading.present();
    this.load = true;
    return this.load;
  }
  
  async hide(): Promise<void> {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
