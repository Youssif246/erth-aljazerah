import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-capabilities',
  standalone: true,
  imports: [],
  templateUrl: './capabilities.component.html',
  styleUrl: './capabilities.component.css'
})
export class CapabilitiesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('capSection') capSection!: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const sectionEl = this.capSection?.nativeElement;
    if (!sectionEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const numEls = sectionEl.querySelectorAll<HTMLElement>('.sculptural-num');
    if (numEls.length < 3) return;

    const targets = [
      { el: numEls[0], target: 100, prefix: '+', suffix: '' },
      { el: numEls[1], target: 50, prefix: '+', suffix: '' },
      { el: numEls[2], target: 100, prefix: '', suffix: '٪' }
    ];

    const toArabicDigits = (num: number): string => {
      const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return String(num).replace(/\d/g, d => arabicDigits[+d]);
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.ngZone.runOutsideAngular(() => {
            const startTime = performance.now();
            const duration = 1500;

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);

              targets.forEach(t => {
                const currentVal = Math.round(t.target * eased);
                t.el.textContent = `${t.prefix}${toArabicDigits(currentVal)}${t.suffix}`;
              });

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          });

          this.observer?.disconnect();
        }
      });
    }, { threshold: 0.2 });

    this.observer.observe(sectionEl);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

