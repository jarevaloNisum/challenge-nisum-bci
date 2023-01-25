import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { MaterialModule } from '../material/material.module';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [RegisterComponent, LoaderComponent, UserFormComponent],
})
export class RegisterModule {}
