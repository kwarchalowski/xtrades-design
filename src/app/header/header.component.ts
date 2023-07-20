import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { AnimationEvent } from "@angular/animations";

interface SideNavToggle {
  screenWidth: number;
  showHamburger: boolean;
  screenHeight: number;
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

  constructor() { }

  showHamburger = false;
  isPageNarrow = false;
  screenWidth = 0;
  screenHeight = 0;
  showSidebar = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resize();
  }

  ngOnInit(): void {
    this.resize();
  }



  toggleCollapse(): void {
    this.showHamburger = !this.showHamburger;
    this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth, screenHeight: this.screenHeight});
  }

  toggleSidebar(): void {
    // this.isPageNarrow != this.isPageNarrow;
    // this.showHamburger = !this.showHamburger;
    // console.log('hey');
    if(this.isPageNarrow) {
      this.showSidebar != this.showSidebar;
      const container: HTMLElement | null = document.getElementById('container');
      if(this.showSidebar) {
        const container: HTMLElement | null = document.getElementById('container');
        if(container) container.style.width = '0';
      } 
    }
    this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth, screenHeight: this.screenHeight});
  }


  resize(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    if(this.screenWidth <= 800) {
      this.showHamburger = true; //!
      this.isPageNarrow = true;
      this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth, screenHeight: this.screenHeight});
      return
    }

    this.showHamburger = false;
    this.isPageNarrow = false;
    this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth, screenHeight: this.screenHeight});
  }

  captureDoneEvent(event: AnimationEvent) {
    if(this.isPageNarrow) {
      this.showHamburger = true;
    }
  }
}
