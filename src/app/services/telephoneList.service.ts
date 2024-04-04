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
    postTelApiUrl = `https://api.baserow.io/api/database/rows/table/276982/?user_field_names=true`
    delTelApiUrl =`https://api.baserow.io/api/database/rows/table/276982/`
    token = 'kXZAlDdwLEEPS0QxCqPBHjGOYSgxDvEc';

    constructor(private http: HttpClient) {}

    getTel(): Observable<TelephoneList[]> {
        const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);

        return this.http.get<TelephoneList[]>(this.telApiUrl, { headers });
    }

    createTel(element: TelephoneList): Observable<TelephoneList>{
        const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);
        return this.http.post<TelephoneList>(this.postTelApiUrl,element,{headers})
    }

    editTel(element: TelephoneList): Observable<TelephoneList>{
        return this.http.put<TelephoneList>(this.telApiUrl, element)
    }

    deleteTel(id: number): Observable<any>{
        const headers = new HttpHeaders().set('Authorization', `Token ${this.token}`);
        return this.http.delete<any>(`${this.delTelApiUrl}${id}/`, {headers})
    }
}


