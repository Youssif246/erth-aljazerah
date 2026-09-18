import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Autoplay, Keyboard, Navigation } from 'swiper/modules';

export interface ExperienceItem {
  number: string;
  category: string;
  title: string;
  description: string;
  highlight: string;
  badge: string;
  image: string;
}

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperRef') swiperRef!: ElementRef<HTMLElement>;
  swiperInstance?: Swiper;

  experiences: ExperienceItem[] = [
    {
      number: '٠١',
      category: 'بيئات حية وسينوغرافيا',
      title: 'سوق تراثي للمنتجات والحرف السعودية.',
      description: 'إعادة إحياء الحارات السعودية القديمة بكامل تفاصيلها المعمارية، ودكاكينها، وأهلها، ورائحة ماضيها التليد.',
      highlight: 'أزقة معمارية متكاملة • دكاكين حية • حركة تفاعلية',
      badge: 'بيئة حية',
      image: '/assets/experiences/experience1.webp'
    },
    {
      number: '٠٢',
      category: 'مهن وتجارة ومقايضة',
      title: 'السوق القديم والعملات التاريخية',
      description: 'تجربة بيع وشراء حية بالعملات القديمة، وأركان المهن التقليدية التي كانت شريان الحياة الاقتصادية في الجزيرة.',
      highlight: 'عملات تاريخية مسكوكة • صرافة قديمة • أركان المقايضة',
      badge: 'تفاعل جماهيري',
      image: '/assets/experiences/experience2.webp'
    },
    {
      number: '٠٣',
      category: 'مجالس سيادية وبطولية',
      title: 'مجلس الملك عبدالعزيز',
      description: 'تجربة سردية وتمثيلية للمناسبات الوطنية الكبرى، مع مراعاة أدق التفاصيل التاريخية في المحتوى والأزياء والضيافة.',
      highlight: 'سرد بطولي موثق • أزياء الحقبة • وقار تاريخي',
      badge: 'مناسبات وطنية',
      image: '/assets/experiences/experience3.webp'
    },
    {
      number: '٠٤',
      category: 'عمق الدولة والتأسيس',
      title: 'مجلس الإمام محمد بن سعود',
      description: 'بناء مجلس تاريخي متكامل يجسد حقبة التأسيس الأولى في الدرعية (1727م)، يجمع الراوي والشخصيات لتقديم حكاية البدايات.',
      highlight: 'يوم التأسيس • قصص الدرعية • شخصيات الحقبة',
      badge: 'سرد تأسيسي',
      image: '/assets/experiences/experience4.webp'
    },
    {
      number: '٠٥',
      category: 'حِرف وأيدٍ ماهرة',
      title: 'قرية الحرفيين والعروض التفاعلية',
      description: 'قرية متكاملة يشارك فيها أمهر الحرفيين والحرفيات من شتى المناطق، مع ورش تفاعلية تتيح للزوار تجربة الصنعة بأنفسهم.',
      highlight: '+100 حرفة • سدو وفخار ونجارة • ورش مباشرة',
      badge: 'ورش مباشرة',
      image: '/assets/experiences/experience5.webp'
    },
    {
      number: '٠٦',
      category: 'عروض أدائية وارتجال',
      title: 'المسرح التراثي المتجول',
      description: 'شخصيات تاريخية ورواة ومؤدون يجوبون ممرات الفعالية وأزقتها، متفاعلين مباشرة مع الجمهور بروح عفوية كاسرة للجمود.',
      highlight: 'العساس • الراوي • الشاعر • البائع المتجول',
      badge: 'عروض حية',
      image: '/assets/experiences/experience6.webp'
    },
    {
      number: '٠٧',
      category: 'هيبة الصحراء والفروسية',
      title: 'القوافل والصقور والخيل والإبل',
      description: 'حضور مهيب لعناصر المشهد البدوي والخيالة وصقاري الجزيرة، مجسدين كرم الضيافة وعراقة الفروسية العربية الأصيلة.',
      highlight: 'صقارة معتمدة • خيالة التراث • هجانة الجزيرة',
      badge: 'عراقة عربية',
      image: '/assets/experiences/experience7.webp'
    },
    {
      number: '٠٨',
      category: 'مؤسسي وذاكرة وطنية',
      title: 'تجربة تاريخ الجهة وتأسيسها',
      description: 'تحويل مسيرة وإنجازات الكيان أو الوزارة إلى قصة وتجربة حية مصممة خصيصاً ترتبط بذاكرتها المؤسسية ورموزها الوطنية.',
      highlight: 'سرد مخصص • احتفالات سنوية • إبراز الأثر',
      badge: 'تخصيص كامل',
      image: '/assets/experiences/experience8.webp'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.swiperRef) {
      this.swiperInstance = new Swiper(this.swiperRef.nativeElement, {
        modules: [Autoplay, Keyboard, Navigation],
        slidesPerView: 1.2,
        spaceBetween: 24,
        loop: true,
        keyboard: { enabled: true },
        autoplay: {
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        breakpoints: {
          640: {
            slidesPerView: 1.6,
            spaceBetween: 28
          },
          1024: {
            slidesPerView: 2.3,
            spaceBetween: 36
          },
          1440: {
            slidesPerView: 2.6,
            spaceBetween: 40
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }
  }

  slideNext(): void {
    this.swiperInstance?.slideNext();
  }

  slidePrev(): void {
    this.swiperInstance?.slidePrev();
  }
}
