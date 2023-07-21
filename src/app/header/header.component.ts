import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { AnimationEvent } from "@angular/animations";
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  showHamburger: boolean;
  showSidenav: boolean;
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

  constructor(private router: Router) { }

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

  ngAfterViewInit() {
    this.checkPath();
  }



  toggleCollapse(): void {
    this.showHamburger = !this.showHamburger;
    this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth, screenHeight: this.screenHeight, showSidenav: this.showSidebar});
  }

  toggleSidebar(): void {
    const hamburger: HTMLElement | null = document.getElementById('hamburger');




    if(hamburger && this.isPageNarrow) {
      console.log(this.showSidebar);

      const container: HTMLElement | null = document.getElementById('container');
    this.showSidebar = !this.showSidebar;

      if(this.showSidebar && container) {
        container?.classList.add('show');
        hamburger.style.filter = 'invert(0)';
        this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth, screenHeight: this.screenHeight, showSidenav: this.showSidebar});
      } else {
        container?.classList.remove('show');
        hamburger.style.filter = 'invert(1)';
        this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth, screenHeight: this.screenHeight, showSidenav: this.showSidebar});
      }
    }

  }


  resize(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    if(this.screenWidth <= 1000) {
      this.checkPath();
      this.showHamburger = true; //!
      this.isPageNarrow = true;
      
      this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth, screenHeight: this.screenHeight, showSidenav: this.showSidebar});
      return
    }

    this.showHamburger = false;
    this.isPageNarrow = false;
    this.toggleSideNav.emit({showHamburger: this.showHamburger, screenWidth: this.screenWidth, screenHeight: this.screenHeight, showSidenav: this.showSidebar});
  }

  captureDoneEvent(event: AnimationEvent) {
    if(this.isPageNarrow) {
      this.showHamburger = true;
    }
  }

  checkPath(): void {
    const hamburger: HTMLElement | null = document.getElementById('hamburger');
    if(!hamburger) return;
    if(this.router.url != '/career') { hamburger.style.filter = 'invert(0)'; return; }

    hamburger.style.filter = 'invert(1)'



  }
}
