import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

@Injectable({
    providedIn: 'root'
})
export class ServicesSongsService {

    constructor(private httpClient: HttpClient,
                private http: HTTP) {
    }

    aGetRemoteJsonData() {
        return this.httpClient.get('assets/data/song_data.json');
    }

    aGetRemoteOnlineJsonData() {
        return this.http.get('http://admin-tily.com:8080/api/json-data', {}, {});
    }
}
