import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})
export class PreloaderComponent implements OnInit, OnDestroy {
  // State signals
  isLoading = signal<boolean>(true);
  isExiting = signal<boolean>(false);
  isFinished = signal<boolean>(false);

  private exitTimeout: any;
  private finishTimeout: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Only schedule timer when running in the browser
    if (isPlatformBrowser(this.platformId)) {
      // 3.2s for slow, calm, professional logo construction and artwork reveal
      this.exitTimeout = setTimeout(() => {
        this.startExit(false);
      }, 3200);
    }
  }

  ngOnDestroy(): void {
    this.clearTimeouts();
  }

  skip(): void {
    if (!this.isFinished() && !this.isExiting()) {
      this.startExit(true);
    }
  }

  private startExit(fast: boolean = false): void {
    this.clearTimeouts();
    this.isExiting.set(true);

    const transitionDuration = fast ? 200 : 420;
    this.finishTimeout = setTimeout(() => {
      this.isFinished.set(true);
      this.isLoading.set(false);
    }, transitionDuration);
  }

  private clearTimeouts(): void {
    if (this.exitTimeout) clearTimeout(this.exitTimeout);
    if (this.finishTimeout) clearTimeout(this.finishTimeout);
  }
}
