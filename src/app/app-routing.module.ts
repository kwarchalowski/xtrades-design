import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CareersComponent } from './careers/careers.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'career', component: CareersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
