import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CartRoutingModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
  ]
})
export class CartModule { }
