import { Component, Inject, PLATFORM_ID, signal, NgZone, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = signal(false);
  isLightPage = signal(false);
  mobileMenuOpen = signal(false);

  private scrollUnlisten?: () => void;
  private routerSub?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.updateRoute(this.router.url);
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateRoute(event.urlAfterRedirects || event.url);
      });
  }

  private updateRoute(url: string) {
    const clean = url.split('?')[0].split('#')[0];
    const isHome = clean === '/' || clean === '';
    this.isLightPage.set(!isHome);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        let lastScrolled = window.scrollY > 40;
        if (lastScrolled) {
          this.ngZone.run(() => this.isScrolled.set(true));
        }

        const handleScroll = () => {
          const scrolled = window.scrollY > 40;
          if (scrolled !== lastScrolled) {
            lastScrolled = scrolled;
            this.ngZone.run(() => {
              this.isScrolled.set(scrolled);
            });
          }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        this.scrollUnlisten = () => window.removeEventListener('scroll', handleScroll);
      });
    }
  }

  toggleMobileMenu(): void {
    const nextState = !this.mobileMenuOpen();
    this.setMenuState(nextState);
  }

  closeMobileMenu(): void {
    this.setMenuState(false);
  }

  private setMenuState(open: boolean): void {
    this.mobileMenuOpen.set(open);
    if (isPlatformBrowser(this.platformId)) {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  ngOnDestroy(): void {
    if (this.scrollUnlisten) {
      this.scrollUnlisten();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}

