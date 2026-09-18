import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface SectorEntry {
  num: string;
  name: string;
  id: string;
}

@Component({
  selector: 'app-target-audiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './target-audiences.component.html',
  styleUrl: './target-audiences.component.css'
})
export class TargetAudiencesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectorsSection') sectorsSection!: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const sectionEl = this.sectorsSection?.nativeElement;
    if (!sectionEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      sectionEl.classList.add('is-revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      (observerEntries) => {
        observerEntries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionEl.classList.add('is-revealed');
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    this.observer.observe(sectionEl);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

