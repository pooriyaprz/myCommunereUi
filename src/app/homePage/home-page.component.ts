import {
  Component,
  OnInit,
  ComponentRef,
  ApplicationRef,
  Injector,
  ComponentFactoryResolver
} from "@angular/core";
import { latLng, tileLayer, LeafletMouseEvent, marker } from "leaflet";
import * as L from "leaflet";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "../api_Service/api-service.service";

import { MapPopUpComponent } from "../mapPopUp/map-pop-up.component";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService,

    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {}
  homePage: FormGroup;
  layers: L.Layer[] = [];
  allLocations: any = [];

  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "..."
      })
    ],
    zoom: 11,
    center: L.latLng(29.63, 52.53),
    fullscreenControl: true
  };
  marker: any;
  compRef: ComponentRef<MapPopUpComponent>;
  ngOnInit() {
    this.api.getAllLocations().subscribe(res => {
      this.allLocations = res;
      this.allLocations.forEach(element => {
        this.addMarker(
          element.lat,
          element.long,
          element.locationName,
          element.strLocationType,
          element.logoPath,
          element.id
        );
      });
    });
  }
  private createCustomPopup(locationName, locationType, logoPath, id) {
    const factory = this.resolver.resolveComponentFactory(MapPopUpComponent);
    const component = factory.create(this.injector);
    console.log(locationName);

    component.instance.locationName = locationName;
    component.instance.locationType = locationType;
    component.instance.logoPath = logoPath;
    component.instance.locationId = id;

    component.changeDetectorRef.detectChanges();

    return component.location.nativeElement;
  }

  addMarker(lat, long, locationName, locationType, logoPath, id) {
    this.layers.push(
      L.marker([lat, long], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: "/assets/Map-Marker-PNG-Pic.png"
        })
      })
        .bindPopup(() =>
          this.createCustomPopup(locationName, locationType, logoPath, id)
        )
        .openPopup()
    );
  }
}
