// import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { TelephoneList } from "../models/TelephoneList";

// @Injectable()
//     export class TelephoneListService {
//         telApiUrl = `https://api.baserow.io/api/database/rows/table/276982/`
//         constructor(private http: HttpClient) {}

//         getTel(): Observable<TelephoneList[]>{
//             return this.http.get<TelephoneList[]>(this.telApiUrl)
//         }
//     }


import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TelephoneList } from "../models/TelephoneList";

@Injectable()
export class TelephoneListService {
    telApiUrl = `https://api.baserow.io/api/database/rows/table/276982/`;
    token = 'kXZAlDdwLEEPS0QxCqPBHjGOYSgxDvEc';

    constructor(private http: HttpClient) {}

    getTel(): Observable<TelephoneList[]> {
        const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);

        return this.http.get<TelephoneList[]>(this.telApiUrl, { headers });
    }
}


