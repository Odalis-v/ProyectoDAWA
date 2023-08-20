import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  template: `
    <img [src]="data.imageUrl" class="dialog-image">
  `,
  styles: [
    `
    .dialog-image {
      width: 100%;
      height: auto;
      max-height: 80vh;
    }
    `
  ]
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
