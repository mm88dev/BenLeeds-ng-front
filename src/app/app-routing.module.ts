import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RoomsWorkorderComponent } from './components/rooms-workorder/rooms-workorder.component';
import { SingleRoomComponent } from './components/single-room/single-room.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AdminComponent } from './components/admin/admin.component';
import { StartComponent } from './components/start/start.component';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';
import { AdminItemsComponent } from './components/admin-items/admin-items.component';
import { AdminVendorsComponent } from './components/admin-vendors/admin-vendors.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminWorkorderComponent } from './components/admin-workorder/admin-workorder.component';
import { AdminVendorComponent } from './components/admin-vendor/admin-vendor.component';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'worker/:userId/:workorderId/workorder',
    component: RoomsWorkorderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'worker/:userId/:workorderId/:roomId',
    component: SingleRoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'worker/:userId/:workorderId',
    component: RoomsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'worker/:userId',
    component: StartComponent,
    canActivate: [AuthGuard]
  },

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/jobs',
    component: AdminJobsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/items',
    component: AdminItemsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/workorder/:workorderId/:vendorId',
    component: AdminWorkorderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/vendors/:vendorId',
    component: AdminVendorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/vendors',
    component: AdminVendorsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/users/:userId',
    component: AdminUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/workorder/:workorderId',
    component: AdminWorkorderComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
