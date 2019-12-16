import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { HomePageComponent } from "./homePage/home-page.component";
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatExpansionModule,
  MatRadioModule,
  MatDialogModule,
  MatSelectModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ShareLocationComponent } from "./shareLocation/share-location.component";
import { NavBarComponent } from "./navBar/nav-bar.component";
import { FileUploaderComponent } from "./fileUploader/file-uploader.component";
import { ApiService } from "./api_Service/api-service.service";
import { MapPopUpComponent } from "./mapPopUp/map-pop-up.component";

const router = [
  {
    path: "",
    component: HomePageComponent
  },
  { path: "newLocation", component: ShareLocationComponent },
  { path: "editLocation/:id", component: ShareLocationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ShareLocationComponent,
    NavBarComponent,
    FileUploaderComponent,
    MapPopUpComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,

    RouterModule.forRoot(router),
    HttpClientModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    LeafletModule.forRoot(),
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  entryComponents: [MapPopUpComponent],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
