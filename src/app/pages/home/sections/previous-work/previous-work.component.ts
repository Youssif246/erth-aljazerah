import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';

export interface PortfolioItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-previous-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './previous-work.component.html',
  styleUrl: './previous-work.component.css'
})
export class PreviousWorkComponent implements AfterViewInit, OnDestroy {
  @ViewChild('portfolioSwiper') portfolioSwiper!: ElementRef<HTMLElement>;
  swiperInstance?: Swiper;

  projects: PortfolioItem[] = [
    {
      id: 'work-1',
      number: '٠١',
      title: 'الحارة التراثية الحية',
      category: 'بيئات حية وسينوغرافيا',
      description: 'إعادة إحياء الحارات السعودية القديمة بكامل تفاصيلها المعمارية ودكاكينها وحركتها التفاعلية.',
      image: '/assets/experiences/experience1.png'
    },
    {
      id: 'work-2',
      number: '٠٢',
      title: 'السوق القديم والعملات التاريخية',
      category: 'مهن ومقايضة تراثية',
      description: 'تجربة بيع وشراء حية بالعملات القديمة وأركان المهن التقليدية وشريان الحياة الاقتصادية التاريخية.',
      image: '/assets/experiences/experience2.png'
    },
    {
      id: 'work-3',
      number: '٠٣',
      title: 'مجلس الملك عبدالعزيز',
      category: 'مجالس سيادية وبطولية',
      description: 'تجربة سردية وتمثيلية للمناسبات الوطنية الكبرى بمراعاة أدق التفاصيل التاريخية في المحتوى والضيافة.',
      image: '/assets/experiences/experience3.png'
    },
    {
      id: 'work-4',
      number: '٠٤',
      title: 'مجلس الإمام محمد بن سعود',
      category: 'عمق الدولة والتأسيس',
      description: 'بناء مجلس تاريخي متكامل يجسد حقبة التأسيس الأولى في الدرعية ويجمع الراوي وشخصيات الحقبة.',
      image: '/assets/experiences/experience4.png'
    },
    {
      id: 'work-5',
      number: '٠٥',
      title: 'قرية الحرفيين والعروض التفاعلية',
      category: 'حِرف وأيدٍ ماهرة',
      description: 'قرية متكاملة يشارك فيها أمهر الحرفيين والحرفيات من شتى المناطق مع ورش حية تتيح تجربة الصنعة.',
      image: '/assets/experiences/experience5.png'
    },
    {
      id: 'work-6',
      number: '٠٦',
      title: 'المسرح التراثي المتجول',
      category: 'عروض أدائية وارتجال',
      description: 'شخصيات تاريخية ورواة ومؤدون يجوبون ممرات الفعالية وأزقتها متفاعلين مباشرة مع الجمهور.',
      image: '/assets/experiences/experience6.png'
    },
    {
      id: 'work-7',
      number: '٠٧',
      title: 'القوافل والصقور والخيل والإبل',
      category: 'هيبة الصحراء والفروسية',
      description: 'حضور مهيب لعناصر المشهد البدوي والخيالة وصقاري الجزيرة، مجسدين كرم الضيافة وعراقة الفروسية.',
      image: '/assets/experiences/experience7.png'
    },
    {
      id: 'work-8',
      number: '٠٨',
      title: 'تجارب التاريخ المؤسسي الحي',
      category: 'ذاكرة وطنية ومؤسسية',
      description: 'تحويل مسيرة وإنجازات الكيان إلى قصة حية مصممة خصيصاً ترتبط بذاكرته وتاريخه الوطني.',
      image: '/assets/experiences/experience8.png'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.portfolioSwiper) {
      setTimeout(() => {
        this.swiperInstance = new Swiper(this.portfolioSwiper.nativeElement, {
          modules: [Navigation, Keyboard],
          keyboard: { enabled: true },
          grabCursor: true,
          speed: 550,
          spaceBetween: 18,
          slidesPerView: 1,
          breakpoints: {
            768: {
              slidesPerView: 1.85,
              spaceBetween: 24
            },
            1024: {
              slidesPerView: 2.35,
              spaceBetween: 28
            },
            1320: {
              slidesPerView: 2.65,
              spaceBetween: 32
            }
          }
        });
        this.cdr.detectChanges();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }
  }

  slidePrev(): void {
    if (this.swiperInstance) {
      this.swiperInstance.slidePrev();
    }
  }

  slideNext(): void {
    if (this.swiperInstance) {
      this.swiperInstance.slideNext();
    }
  }
}
