import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: "<app-nav-bar></app-nav-bar><router-outlet></router-outlet>",

  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "SampleUi";
}
