import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { SongsService } from '../songs.service';
import { map, catchError } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';
import { error } from 'protractor';

@Injectable()
export class SongsResolverService implements Resolve<any>{
  constructor(private songsService: SongsService, private network: Network, private alertController: AlertController) { }

  isConnected(): boolean {
    let conntype = this.network.type;
    return conntype && conntype !== 'unknown' && conntype !== 'none';
  }

  resolve(): Observable<any> {
    if (this.isConnected()) {
      return this.songsService.aGetRemoteOnlineJsonData().pipe(map(
        response => {
          localStorage.setItem('songsDataStorageInline', JSON.stringify(response));
          localStorage.setItem('songsDataStorage', JSON.stringify(response));
        }
      )).pipe(catchError((error) => {
      this.presentAlert(error.message);
        return error;
      }));
    }
    return this.songsService.aGetRemoteJsonData().pipe(map(
      response => {
        localStorage.setItem('songsDataStorage', JSON.stringify(response));
      }
    )).pipe(catchError((error) => {
      this.presentAlert(error.message);
      return error;
    }));
  }
  
  async presentAlert(reason) {
    const alert = await this.alertController.create({
        header: `Error`,
        message: reason,
        buttons: ['OK']
    });

    await alert.present();
}
}
