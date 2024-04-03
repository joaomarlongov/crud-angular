import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TelephoneList } from "../models/TelephoneList";
import { HttpHeaderResponse, HttpHeaders } from "@angular/common/http";

@Injectable()
    export class TelephoneListService {
        telApiUrl = `https://api.baserow.io/api/database/rows/table/276982/`
        constructor(private http: HttpClient) {}

        getTel(): Observable<TelephoneList[]>{
            return this.http.get<TelephoneList[]>(this.telApiUrl)
        }
    }


