import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { latLng, tileLayer, LeafletMouseEvent, marker } from "leaflet";
import * as L from "leaflet";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { ApiService } from "../api_Service/api-service.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-share-location",
  templateUrl: "./share-location.component.html",
  styleUrls: ["./share-location.component.css"]
})
export class ShareLocationComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  shareLocation: FormGroup;
  streetMaps = L.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      detectRetina: true,
      attribution: ""
    }
  );
  wMaps = L.tileLayer("http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png", {
    detectRetina: true,
    attribution: ""
  });
  googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    attribution: "",
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
  });
  summit = marker([29.631732, 52.5354509], {
    draggable: true,

    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],

      iconUrl: "/assets/Map-Marker-PNG-Pic.png"
    })
  });

  layersControl = {
    baseLayers: {
      "Street Map": this.streetMaps,
      Map: this.wMaps,
      "Satellite Map": this.googleSat
    },
    overlays: {
      "Current Situtaion": this.summit
    }
  };
  latgs: string[] = [];
  layers: L.Layer[] = [];
  leafMap: L.Map;
  options = {
    layers: [this.streetMaps, this.summit],
    zoom: 11,
    center: L.latLng([29.629304, 52.55048])
  };
  locationId: number = 0;
  location;
  ngOnInit() {
    this.locationId = Number(this.route.snapshot.paramMap.get("id"));

    this.shareLocation = this.fb.group({
      Id: [""],
      Lat: ["", Validators.required],
      Long: ["", Validators.required],
      Image: new FormControl(null, [Validators.required]),
      LocationName: ["", Validators.required],
      LocationType: ["", Validators.required]
    });

    if (this.locationId !== 0) {
      this.api.getLocationById(this.locationId).subscribe((res: any) => {
        this.shareLocation.controls.Id.setValue(res.id);
        this.shareLocation.controls.Lat.setValue(res.lat);
        this.shareLocation.controls.Lat.clearAsyncValidators();
        this.shareLocation.controls.Long.setValue(res.long);
        this.shareLocation.controls.Long.clearAsyncValidators();
        this.shareLocation.controls.LocationName.setValue(res.locationName);
        this.shareLocation.controls.LocationName.clearAsyncValidators();
        this.shareLocation.controls.LocationType.setValue(res.locationType);
        this.shareLocation.controls.LocationType.clearAsyncValidators();

        this.summit.remove();
        this.layers.push(
          (this.summit = L.marker(
            [
              this.shareLocation.controls.Lat.value,
              this.shareLocation.controls.Long.value
            ],
            {
              icon: L.icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: "/assets/Map-Marker-PNG-Pic.png"
              })
            }
          ))
        );
      });
    }
  }

  onMapReady(map: L.Map) {
    this.leafMap = map;
    map.flyTo(this.summit.getLatLng(), 16, { animate: true });
    map.on("click", e => {
      this.onMapClick(e as LeafletMouseEvent);
    });
  }

  onMapClick(event: LeafletMouseEvent) {
    this.summit.setLatLng(event.latlng);
    this.shareLocation.controls.Lat.setValue(event.latlng.lat);

    this.shareLocation.controls.Long.setValue(event.latlng.lng);

    this.shareLocation.updateValueAndValidity();
    this.http
      .get(
        "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
          event.latlng.lat +
          "&lon=" +
          event.latlng.lng
      )
      .subscribe(res => {
        var address = JSON.stringify(res, ["address"]["road"]);
        console.log(this.shareLocation.controls.Lat.value);
        console.log(this.shareLocation.controls.Long.value);

        console.log(res);
      });
  }
  onSubmit() {
    if (this.locationId == 0) {
      this.api.postNewLocation(this.shareLocation.value);
    } else {
      this.api.putLocation(this.shareLocation.value);
    }
  }
}
