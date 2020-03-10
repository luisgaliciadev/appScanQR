import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextoPageRoutingModule } from './texto-routing.module';

import { TextoPage } from './texto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextoPageRoutingModule
  ],
  declarations: [TextoPage]
})
export class TextoPageModule {}
