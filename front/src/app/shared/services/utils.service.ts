import { configConstants } from './../../constants/config.constants';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

/** servicio de utilidades */
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  /** constructor de utils service */
  constructor(private TitleService: Title) {}

  /** metodo para cambiar titulo de la web */
  public changeTitle(title: string): void {
    this.TitleService.setTitle(configConstants.title + ' | ' + title);
  }
}
