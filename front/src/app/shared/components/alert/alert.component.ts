import { Component, Input } from '@angular/core';

/** alerta componente */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  /** color del fondo de la alerta */
  @Input() color = 'primary';

  /** mensaje de la alerta */
  @Input() message = '';
}
