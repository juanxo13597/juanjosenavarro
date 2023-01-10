import { Component, Input } from '@angular/core';

/** spinner componente */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  /** color del fondo del spinner */
  @Input() color = 'primary';
}
