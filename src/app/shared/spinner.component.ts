import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: '<mat-spinner [diameter]="diameter" style="margin: .5rem 1rem;" [ngStyle]="{\'--mdc-circular-progress-active-indicator-color\': color}"></mat-spinner>'
})
export class SpinnerComponent {
  @Input() diameter: number = 40;
  @Input() color: string = 'var(--green)';
}
