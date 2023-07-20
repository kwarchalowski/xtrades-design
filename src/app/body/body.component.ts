import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() showSidenav = true;
  @Input() screenHeight = 0;
  @Input() screenWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth >= 800) this.showSidenav = false;
    else this.showSidenav = true;
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.screenWidth < 800) {
      styleClass = 'narrow';
      
    }


    // if (this.collapsed && this.screenHeight > 800) {
    //   styleClass = 'body-trimmed';
    // } else if (this.collapsed && this.screenHeight <= 800 && this.screenHeight > 0) {
    //   styleClass = 'body-md-screen';
    // }
    return styleClass;
  }

}
