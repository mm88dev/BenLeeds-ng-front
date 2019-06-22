import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AdminComponent } from './components/admin/admin.component';
import { RoomsHeaderComponent } from './components/rooms-header/rooms-header.component';

import { RoomsWorkorderComponent } from './components/rooms-workorder/rooms-workorder.component';
import { SingleRoomComponent } from './components/single-room/single-room.component';
import { LinktransformPipe } from './pipes/linktransform.pipe';
import { StartComponent } from './components/start/start.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';
import { AdminItemsComponent } from './components/admin-items/admin-items.component';
import { AdminVendorsComponent } from './components/admin-vendors/admin-vendors.component';
import { ModalWorkorderComponent } from './components/modal-workorder/modal-workorder.component';
import { AdminWorkorderComponent } from './components/admin-workorder/admin-workorder.component';
import { ModalVendorComponent } from './components/modal-vendor/modal-vendor.component';
import { AdminVendorComponent } from './components/admin-vendor/admin-vendor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatButtonModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthInterceptor } from './services/auth-interceptor';
import { ErrorInterceptor } from './services/error-interceptor';
import { ErrorComponent } from './components/error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomsComponent,
    SingleRoomComponent,
    AdminComponent,
    RoomsHeaderComponent,
    RoomsWorkorderComponent,
    LinktransformPipe,
    StartComponent,
    AdminNavbarComponent,
    AdminUsersComponent,
    AdminJobsComponent,
    AdminItemsComponent,
    AdminVendorsComponent,
    ModalWorkorderComponent,
    AdminWorkorderComponent,
    ModalVendorComponent,
    AdminVendorComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent] // moramo da dodamo jer ne koristimo preko selectora
})
export class AppModule {}
