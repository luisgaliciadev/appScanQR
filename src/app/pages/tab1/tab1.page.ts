import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }

  constructor(
    private _barcodeScanner: BarcodeScanner,
    private _dataLocalService: DataLocalService
  ) {}

  ionViewDidEnter() {    
  }

  ionViewWillEnter() {
   // this.scan();
    // console.log('ionViewWillEnter');
  }



  scan() {
    this._dataLocalService.guardarRegistro('barcodeData.format', 'https://www.linkedin.com/in/luis-raul-galicia-lugo-718919191/');
    this._barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
        this._dataLocalService.guardarRegistro(barcodeData.format, barcodeData.text)
       
      }

     }).catch(err => {
         console.log('Error', err);
         //this._dataLocalService.guardarRegistro('barcodeData.format', 'luisgalicia-lddkl-kdfldk');
         // this._dataLocalService.guardarRegistro('barcodeData.format', 'geo:40.73151796986687,-74.06087294062502');
         this._dataLocalService.guardarRegistro('barcodeData.format', 'https://www.linkedin.com/in/luis-raul-galicia-lugo-718919191/');
     });
  }

  

}
