import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  showHamburger: boolean;
  showSidenav: boolean;
  screenHeight: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'xtrades-design';

  isSideNavCollapsed = false;
  showSidenav = true;
  screenWidth = 0;
  screenHeight = 0;

  toggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.screenHeight = data.screenHeight;
    this.isSideNavCollapsed = !data.showSidenav;
  }

}
