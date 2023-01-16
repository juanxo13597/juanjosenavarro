import { Component } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';

/** pagina home */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(private UtilsService: UtilsService) {
    this.UtilsService.changeTitle('Inicio');
  }
}
