import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('timelineWrap') timelineWrap!: ElementRef<HTMLElement>;
  @ViewChild('progressLine') progressLine!: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;

  goals = [
    {
      num: '٠١',
      text: 'الحفاظ على الموروث السعودي وموروث الجزيرة العربية وإعادة تقديمه بصورة حية وجذابة للأجيال الجديدة.'
    },
    {
      num: '٠٢',
      text: 'تحويل التراث من محتوى يُشاهد إلى تجربة تُعاش ويتفاعل معها الزائر.'
    },
    {
      num: '٠٣',
      text: 'دعم الحرفيين والفنانين والفرق الشعبية والممارسين المرتبطين بالموروث، وخلق فرص ظهور مستمرة لهم.'
    },
    {
      num: '٠٤',
      text: 'توثيق التنوع الثقافي لمناطق المملكة وإبرازه ضمن فعاليات وتجارب تحترم خصوصية كل منطقة.'
    },
    {
      num: '٠٥',
      text: 'تطوير منتجات وتجارب تراثية قابلة للتنفيذ للجهات الحكومية والخاصة والفعاليات والمواسم والمناسبات الوطنية.'
    },
    {
      num: '٠٦',
      text: 'ابتكار محتوى وطني وثقافي يربط الماضي بالحاضر ويعزز الاعتزاز بالهوية.'
    },
    {
      num: '٠٧',
      text: 'بناء شبكة وطنية قوية من الحرفيين والفرق والمؤدين والموردين المتخصصين في المجال التراثي.'
    },
    {
      num: '٠٨',
      text: 'الوصول بإرث الجزيرة إلى حضور مؤثر في الأحداث الكبرى داخل المملكة وخارجها.'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const rows = this.timelineWrap?.nativeElement.querySelectorAll<HTMLElement>('.timeline-row');
    if (!rows || rows.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      rows.forEach(r => r.classList.add('is-active'));
      if (this.progressLine) {
        this.progressLine.nativeElement.style.height = '100%';
      }
      return;
    }

    let activeCount = 0;
    const totalRows = rows.length;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (!target.classList.contains('is-active')) {
              target.classList.add('is-active');
              activeCount++;
              if (this.progressLine) {
                const pct = Math.min(100, Math.round((activeCount / totalRows) * 100));
                this.progressLine.nativeElement.style.height = `${pct}%`;
              }
            }
            this.observer?.unobserve(target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    rows.forEach(r => this.observer?.observe(r));
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

