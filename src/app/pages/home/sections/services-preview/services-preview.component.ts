import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  tag: string;
  image: string;
}

@Component({
  selector: 'app-services-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-preview.component.html',
  styleUrl: './services-preview.component.css'
})
export class ServicesPreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('servicesSwiper') servicesSwiper!: ElementRef<HTMLElement>;
  @ViewChild('prevBtn') prevBtn!: ElementRef<HTMLElement>;
  @ViewChild('nextBtn') nextBtn!: ElementRef<HTMLElement>;
  swiperInstance?: Swiper;

  services: ServiceItem[] = [
    {
      id: 'integrated-experiences',
      number: '٠١',
      name: 'تصميم وإنتاج التجارب التراثية المتكاملة',
      shortDesc: 'ابتكار الفكرة، بناء القصة، وتصميم رحلة الزائر الشاملة.',
      fullDesc: 'ابتكار الفكرة، بناء القصة، وتصميم رحلة الزائر، واختيار عناصر التجربة، ثم الإشراف على التنفيذ الميداني الكامل لضمان اندماج الحكاية مع المكان والوجدان.',
      features: ['بناء قصة متكاملة ومحكمة', 'تصميم رحلة الزائر من الصفر', 'إشراف ميداني وتنفيذ كامل'],
      tag: 'التجربة الشاملة',
      image: '/assets/services/تصميم_وإنتاج_التجارب_التراثية_المتكاملة.png'
    },
    {
      id: 'national-events',
      number: '٠٢',
      name: 'الفعاليات والمناسبات الوطنية والثقافية',
      shortDesc: 'تصميم وتنفيذ الفعاليات والاحتفالات والمعارض المرتبطة بالهوية والموروث.',
      fullDesc: 'تصميم وتنفيذ الفعاليات والاحتفالات والمعارض والملتقيات التي ترتبط بالهوية الوطنية والموروث والثقافة وفق طابع سعودي أصيل يعبر عن فخر المناسبة.',
      features: ['احتفالات الأيام والمناسبات الوطنية', 'المعارض الثقافية المتخصصة', 'أجنحة الاستقبال التراثية الرفيعة'],
      tag: 'المناسبات الكبرى',
      image: '/assets/services/الفعاليات_والمناسبات_الوطنية_والثقافية.png'
    },
    {
      id: 'craftsmen',
      number: '٠٣',
      name: 'الحرفيون والحِرف التراثية المباشرة',
      shortDesc: 'شبكة تضم أكثر من 100 حرفي وحرفية من مختلف مناطق المملكة.',
      fullDesc: 'شبكة حية تضم أكثر من 100 حرفي وحرفية في تخصصات تراثية نادرة، لتقديم العروض الحية والورش التفاعلية والقرى الحرفية المباشرة أمام الجمهور.',
      features: ['+100 حرفي وحرفية معتمدين', 'ورش عمل تفاعلية حية مع الجمهور', 'قرى وأسواق حرفية متكاملة'],
      tag: 'حِرف حية',
      image: '/assets/services/الحرفيون_والحِرف_التراثية.png'
    },
    {
      id: 'folklore-arts',
      number: '٠٤',
      name: 'الفنون والفرق الشعبية الأدائية',
      shortDesc: 'تعاون واتفاقيات مع أكثر من 50 فرقة شعبية بمختلف ألوان الفنون.',
      fullDesc: 'تعاون واتفاقيات وتواصل مباشر مع أكثر من 50 فرقة شعبية مرخصة لتقديم مختلف الألوان والفنون التقليدية التي تعبّر عن أصالة كل بيئة جغرافية.',
      features: ['+50 فرقة شعبية معتمدة', 'تغطية لكافة مناطق وفنون المملكة', 'عروض حية مبهجة ومنسقة'],
      tag: 'فنون الجزيرة',
      image: '/assets/services/الفنون_والفرق_الشعبية.png'
    },
    {
      id: 'national-troupes',
      number: '٠٥',
      name: 'الفرق الاستعراضية الوطنية',
      shortDesc: 'لوحات واستعراضات وطنية ومسرحية متميزة في التكوين الحركي والإخراجي.',
      fullDesc: 'فرق متخصصة في تقديم اللوحات والاستعراضات الوطنية والمسرحية المعاصرة تختلف من حيث التكوين الحركي والكوريغرافيا والإخراج المسرحي.',
      features: ['كوريغرافيا وطنية حركية مدروسة', 'أزياء تاريخية واستعراضية مصممة خصيصاً', 'انسجام مع السينوغرافيا والمؤثرات'],
      tag: 'استعراض وطني',
      image: '/assets/services/الفرق_الاستعراضية_الوطنية.png'
    },
    {
      id: 'national-operettas',
      number: '٠٦',
      name: 'الأوبريتات والملاحم الوطنية',
      shortDesc: 'تنفيذ الأوبريت واللوحات الاستعراضية الوطنية من القصيدة إلى المسرح.',
      fullDesc: 'تنفيذ الأوبريت من الفكرة حسب طلب الجهة، إلى كتابة القصيدة والتلحين التراثي، وتصميم اللوحات الغنائية والاستعراضية، وصولاً إلى المسرح.',
      features: ['تأليف وتلحين شعري مخصص', 'فرق استعراضية وطنية متمرسة', 'إخراج سينوغرافي مسرحي متكامل'],
      tag: 'إنتاج ملحمي',
      image: '/assets/services/الأوبريتات_الوطنية.png'
    },
    {
      id: 'heritage-characters',
      number: '٠٧',
      name: 'الشخصيات التراثية والتمثيل الحي',
      shortDesc: 'إدارة شخصيات تمثل حقباً تاريخية ومجتمعية تنقل الزائر لقلب الماضي.',
      fullDesc: 'توفير وإدارة شخصيات تمثل حقباً تاريخية ومجتمعية مثل الراوي والشاعر والمرحب والعساس وشخصيات المجالس والأسواق والمهن القديمة.',
      features: ['رواة معتمدون وقصاصون تاريخيون', 'شخصيات الحارة والأسواق القديمة', 'أزياء موثقة زمانياً ومكانياً'],
      tag: 'تمثيل حي',
      image: '/assets/services/الشخصيات_التراثية_والتمثيل_التاريخي_الحي.png'
    },
    {
      id: 'historical-majlis',
      number: '٠٨',
      name: 'المجالس التاريخية الحية',
      shortDesc: 'مجلس تاريخي متكامل يجمع الراوي والشاعر والمشاهد التمثيلية المباشرة.',
      fullDesc: 'بناء مجلس تاريخي متكامل يجمع الراوي والشاعر والشخصيات والمشاهد التمثيلية المباشرة لتتحول المجالس إلى تجربة حية مستمرة تنبض بالضيافة.',
      features: ['مجلس الملك عبدالعزيز ومجالس التأسيس', 'أزياء تاريخية موثقة بدقة', 'رواة وشعراء أصيلون'],
      tag: 'سرد حي',
      image: '/assets/services/المجالس_التاريخية_الحية.png'
    },
    {
      id: 'wandering-theatre',
      number: '٠٩',
      name: 'المسرح المتجول والعروض التفاعلية',
      shortDesc: 'عروض وشخصيات تتحرك بين ممرات الفعالية وأزقتها متفاعلة مع الجمهور.',
      fullDesc: 'عروض وشخصيات حية تتحرك بين ممرات الفعالية وأزقتها وتتفاعل مباشرة مع الجمهور بروح عفوية، بدلاً من حصر التجربة في المسارح الثابتة.',
      features: ['مشاهد درامية مباغتة بين الزوار', 'منادو الأسواق والباعة المتجولون', 'مواكب استعراضية بين الساحات'],
      tag: 'عروض حية',
      image: '/assets/experiences/experience6.png'
    },
    {
      id: 'heritage-decor',
      number: '١٠',
      name: 'تصميم وتنفيذ الديكورات والبيئات التراثية',
      shortDesc: 'تنفيذ بيئات وحارات وأسواق ومجالس مخصصة من الصفر بمواد طبيعية.',
      fullDesc: 'تصميم وبناء بيئات مخصصة من الصفر مثل الحارات والأسواق والمجالس والبيوت والدكاكين والبوابات والساحات المستوحاة من عمارة مناطق المملكة.',
      features: ['حارات نجدية وحجازية وجنوبية كاملة', 'أبواب وبوابات محاكية للأصل', 'مواد طبيعية: طين، حجر، وخشب أثل'],
      tag: 'بناء سينوغرافي',
      image: '/assets/services/تصميم وتنفيذ_الديكورات_والبيئات_التراثية.png'
    },
    {
      id: 'heritage-animals',
      number: '١١',
      name: 'الحيوانات المرتبطة بالتجربة التراثية',
      shortDesc: 'صقور وخيول وإبل تضفي هيبة الأصالة على المشهد التراثي.',
      fullDesc: 'توفير وإدارة الحيوانات المرتبطة بالبادية والموروث العربي مثل الصقور العربية الأصيلة، والخيول، والهجانة والإبل المحملة تحت إشراف كامل.',
      features: ['صقارون مرخصون وصقور حرة', 'خيول عربية أصيلة مع فرسانها', 'قوافل الهجانة في ساحات الفعالية'],
      tag: 'فروسية وأصالة',
      image: '/assets/services/الحيوانات_المرتبطة_بالتجربة_التراثية.png'
    },
    {
      id: 'traditional-games',
      number: '١٢',
      name: 'تجارب الأطفال والألعاب الشعبية',
      shortDesc: 'إشراك الصغار في ألعاب الحارة القديمة وورش المهن التراثية.',
      fullDesc: 'إشراك الأطفال في الاستقبالات والألعاب القديمة والمشاهد الحية، وتصميم تجارب وأجواء تراثية مبهجة تغرس محبة الهوية والانتماء في وجدان الأجيال.',
      features: ['ألعاب الحارة الشعبية التفاعلية', 'أزياء تراثية مخصصة للأطفال', 'ورش حِرف مبسطة وسرد قصصي'],
      tag: 'أجيال وعائلة',
      image: '/assets/services/تجارب_الأطفال_والألعاب_الشعبية.png'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.servicesSwiper) {
      setTimeout(() => {
        this.swiperInstance = new Swiper(this.servicesSwiper.nativeElement, {
          modules: [Navigation, Keyboard],
          keyboard: { enabled: true },
          grabCursor: true,
          speed: 500,
          spaceBetween: 16,
          slidesPerView: 1,
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 22
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 26
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 28
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

  // In RTL layouts, next moves left, prev moves right
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


