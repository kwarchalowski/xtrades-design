import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenHeight = 0;

  getBodyClass(): string {
    let styleClass = '';
    // if (this.collapsed && this.screenHeight > 800) {
    //   styleClass = 'body-trimmed';
    // } else if (this.collapsed && this.screenHeight <= 800 && this.screenHeight > 0) {
    //   styleClass = 'body-md-screen';
    // }
    return styleClass;
  }

}
