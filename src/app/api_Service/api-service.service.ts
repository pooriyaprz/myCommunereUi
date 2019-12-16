import { Injectable } from "@angular/core";

import { pipe } from "rxjs";
import {
  HttpEvent,
  HttpResponse,
  HttpEventType,
  HttpClient
} from "@angular/common/http";
import { filter, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class ApiService {
  progress = 0;
  success = false;

  constructor(private http: HttpClient, private router: Router) {}
  postNewLocation(location) {
    this.http
      .post("https://localhost:44310/api/Location", toFormData(location), {
        reportProgress: true,
        observe: "events"
      })
      .pipe(toResponseBody())
      .subscribe(res => {
        this.progress = 0;
        this.success = true;
        this.router.navigate([""]);
      });
  }
  getAllLocations() {
    return this.http.get("https://localhost:44310/api/Location");
  }

  getLocationById(id) {
    return this.http.get("https://localhost:44310/api/Location/" + id);
  }
  putLocation(location) {
    this.http
      .put("https://localhost:44310/api/Location", toFormData(location), {
        reportProgress: true,
        observe: "events"
      })
      .pipe(toResponseBody())
      .subscribe(res => {
        this.progress = 0;
        this.success = true;
        this.router.navigate([""]);
      });
  }
}

export function toResponseBody<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

export function toFormData<T>(formValue: T) {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
