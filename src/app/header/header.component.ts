import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AnimationEvent } from "@angular/animations";

interface SideNavToggle {
  screenWidth: number;
  showHamburger: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger("thumbsInOut", [
      transition(":enter", [
        query(":self", [
          style({ opacity: 0 }),
          stagger(0, [
            animate(
              ".75s ease-out",
              style({
                opacity: 1
              })
            )
          ])
        ], {optional: true})
      ]),
      transition(":leave", [
        query(".anim", [
          style({ opacity: 1 }),
          stagger(0, [
            animate(
              ".75s ease-out",
              style({
                opacity: 0
              })
            )
          ])
        ], {optional: true})
      ])
    ]),
  ],

})
export class HeaderComponent implements OnInit {

  @Output() toggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  showHamburger = false;
  isPageNarrow = false;
  screenWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    
    if(this.screenWidth <= 800) {
      this.showHamburger = true;
      this.isPageNarrow = false;
      this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth});
      return
    }

    this.showHamburger = false;
    this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth});

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.showHamburger = !this.showHamburger;
    this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth});
  }

  toggleHamburger(): void {
    this.isPageNarrow != this.isPageNarrow;
    // this.showHamburger = !this.showHamburger;
    // this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth});
  }

  captureDoneEvent(event: AnimationEvent) {
    if(this.isPageNarrow) {
      this.showHamburger = true;
    }
  }

}
