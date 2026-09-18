import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroContainer') heroContainer!: ElementRef<HTMLElement>;
  @ViewChild('heroImage') heroImage!: ElementRef<HTMLImageElement>;
  @ViewChild('heroOverlay') heroOverlay!: ElementRef<HTMLElement>;

  private scrollHandler?: () => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const img = this.heroImage?.nativeElement;

    // Smooth subtle background parallax on scroll (running outside Angular Zone)
    if (img) {
      this.ngZone.runOutsideAngular(() => {
        let ticking = false;
        this.scrollHandler = () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const scrollY = window.scrollY;
              if (scrollY < window.innerHeight * 1.5) {
                img.style.transform = `scale(1.02) translateY(${scrollY * 0.08}px)`;
              }
              ticking = false;
            });
            ticking = true;
          }
        };

        window.addEventListener('scroll', this.scrollHandler, { passive: true });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.scrollHandler && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }
}
