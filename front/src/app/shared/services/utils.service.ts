import { configConstants } from './../../constants/config.constants';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private TitleService: Title) {}

  public changeTitle(title: string): void {
    this.TitleService.setTitle(configConstants.title + ' | ' + title);
  }
}
