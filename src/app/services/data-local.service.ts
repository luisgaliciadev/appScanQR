import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  guardados: Registro[] = [];

  constructor(
    private storage: Storage,
    private _navController: NavController,
    private _inAppBrowser: InAppBrowser,
    private _file: File,
    private _emailComposer: EmailComposer
  ) { 
    this.cargarStorage();
  }

  async cargarStorage() {
    this.guardados = (await this.storage.get('registros')) || [];
  }

  async guardarRegistro(format: string, text: string) {
    await this.cargarStorage();
    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);
    console.log(this.guardados);
    this.storage.set('registros', this.guardados);
   
    this.abrirRegistro(nuevoRegistro);
  }

  abrirRegistro(registro: Registro) {
    this._navController.navigateForward('/tabs/tab2');

    switch (registro.type) {
      case 'http':
        this._inAppBrowser.create(registro.text, '_system');
      break;

      case 'geo':
        this._navController.navigateForward('/tabs/tab2/mapa/' + registro.text);
      break;

      default:
        this._navController.navigateForward('/tabs/tab2/texto/' + registro.text);
    }
  }


  limpiarHistorial() {
    this.storage.clear();
    this.guardados = [];
  }

  enviarCorreo() {
    const arrTemp = [];
    const titulos ='Tipo, Formato, Creado, Texto\n';

    arrTemp.push(titulos);
    this.guardados.forEach( registro => {
      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}\n`;

      arrTemp.push(linea);

      console.log(arrTemp.join(''));

      this.crearArchivo(arrTemp.join(''));

      

    });
  }

  crearArchivo(text: string) {
    this._file.checkFile(this._file.dataDirectory, 'reggistros.csv')
      .then( existe =>{
        console.log('Existe Archivo?', existe);
        return this.escribirEnArchiv(text);
      })
      .catch( err => {
        return this._file.createFile(this._file.dataDirectory, 'reggistros.csv', false)
          .then(creado => {
            this.escribirEnArchiv(text);
          })
          .catch(err2=> {
            console.log('No se pudo crear el archivo.');
          });
      });
  }

  async escribirEnArchiv(text: string) {
    await this._file.writeExistingFile(this._file.dataDirectory, 'registros.csv', text);
    console.log('Archivo creado');
    console.log(this._file.dataDirectory+'registros.csv');
    const archivo = `${this._file.dataDirectory}/registros.csv`;

    const email = {
      to: 'luisgalic@gmail.com',
      attachments: [
        archivo
      ],
      subject: 'Backup Historial scan',
      body: 'En el correo esta adjunto el archivo con el historial de scan.',
      isHtml: true
    };
    // Send a text message using default options
    console.log('email',email)
    this._emailComposer.open(email);
  }

}
