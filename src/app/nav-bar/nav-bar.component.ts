import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class NavBarComponent implements OnInit {
  text = 'hello';
  hideMobileMenu = true;

  constructor(
    private eRef: ElementRef,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  onMenuClick() {
    this.hideMobileMenu = !this.hideMobileMenu;
  }

  // close the menu on outside click
  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideMobileMenu = true;
    }
  }

  onNavLinkClick(btnName: string) {
    let currentUrl = this.router.url;
    console.log(currentUrl);
    if (currentUrl == btnName) {
      window.location.reload();
    }
    this.router.navigate([btnName]);
  }
  onCategoryClick(categoryName: string) {}
}
