import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.scss']
})
export class LoginButtonsComponent {

  screenWidth = 0;
  horizontal = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    
    if(this.screenWidth <= 1000) {
      this.horizontal = false;
      // this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth});
      return
    }

    this.horizontal = true;
    // this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth});

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

}
