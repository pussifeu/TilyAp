import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ServicesSongsService {

    constructor(private httpClient: HttpClient) {
    }

    aGetRemoteJsonData() {
        return this.httpClient.get('assets/data/song_data.json');
    }
}
