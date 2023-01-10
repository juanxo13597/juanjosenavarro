import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

/** modulo compartido */
@NgModule({
  declarations: [AlertComponent, SpinnerComponent],
  imports: [CommonModule],
  exports: [AlertComponent, SpinnerComponent],
})
export class SharedModule {}
