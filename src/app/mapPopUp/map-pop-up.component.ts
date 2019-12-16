import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-map-pop-up",
  templateUrl: "./map-pop-up.component.html",
  styleUrls: ["./map-pop-up.component.css"]
})
export class MapPopUpComponent implements OnInit {
  constructor(private router: Router) {}
  locationName;
  locationType;
  logoPath;
  path;
  locationId;
  ngOnInit() {
    this.path = "https://localhost:44310" + this.logoPath;
    console.log(this.logoPath);
  }
  locationEdit(id) {
    this.router.navigate(["editLocation/" + id]);
  }
}
