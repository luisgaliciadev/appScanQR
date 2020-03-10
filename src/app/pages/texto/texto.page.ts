import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.page.html',
  styleUrls: ['./texto.page.scss'],
})
export class TextoPage implements OnInit {
  texto: string;
  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }

  constructor(
    private _router: ActivatedRoute
  ) { }

  ngOnInit() {
    let text: any = this._router.snapshot.paramMap.get('text');
    this.texto = text;
  }

}
