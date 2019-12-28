import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable()
export class SongsService {
    private ASSETS_URL: string = environment.assetsUrl;
    private URL_API: string = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }
    aGetRemoteJsonData(): Observable<any> {
        return this.httpClient.get(`${this.ASSETS_URL}/song_data.json`);
    }
    aGetRemoteOnlineJsonData(): Observable<any> {
        return this.httpClient.get(`${this.URL_API}/json-data`);
    }
}
