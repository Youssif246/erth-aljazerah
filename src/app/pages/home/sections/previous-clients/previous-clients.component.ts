import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

export interface ClientEntity {
  id: string;
  name: string;
  logo: string;
}

@Component({
  selector: 'app-previous-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './previous-clients.component.html',
  styleUrl: './previous-clients.component.css'
})
export class PreviousClientsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('clientSwiper') clientSwiper!: ElementRef<HTMLElement>;
  swiperInstance?: Swiper;

  // The 13 official clients provided in the project
  clients: ClientEntity[] = [
    { id: 'moi', name: 'وزارة الداخلية', logo: '/assets/clients/وزارة_الداخلية.png' },
    { id: 'mofa', name: 'وزارة الخارجية', logo: '/assets/clients/وزارة_الخارجية.jpg' },
    { id: 'moe', name: 'وزارة التعليم', logo: '/assets/clients/وزارة_التربية_والتعليم.jpg' },
    { id: 'dgda', name: 'بوابة الدرعية', logo: '/assets/clients/بوابة_الدرعية.jpg' },
    { id: 'kafd', name: 'المركز المالي', logo: '/assets/clients/المركز_المالي.png' },
    { id: 'riyad-bank', name: 'بنك الرياض', logo: '/assets/clients/بنك_الرياض.jpg' },
    { id: 'sec', name: 'الشركة السعودية للكهرباء', logo: '/assets/clients/شركة_الكهرباء.jpg' },
    { id: 'ajlan', name: 'شركة العجلان وإخوانه', logo: '/assets/clients/شركة_العجلان.png' },
    { id: 'kkia', name: 'مطار الملك خالد الدولي', logo: '/assets/clients/مطار_الملك_خالد.jpg' },
    { id: 'matarat', name: 'شركة مطارات القابضة', logo: '/assets/clients/مطارات_القابضة.png' },
    { id: 'alhilal', name: 'نادي الهلال السعودي', logo: '/assets/clients/نادي_الهلال.jpg' },
    { id: 'fsf', name: 'قوات أمن المنشآت', logo: '/assets/clients/قوات_امن_المنشآت.jpg' },
    { id: 'prisons', name: 'المديرية العامة للسجون', logo: '/assets/clients/المديرية_العامة_للسجون.jpg' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.clientSwiper) {
      this.swiperInstance = new Swiper(this.clientSwiper.nativeElement, {
        modules: [Autoplay],
        slidesPerView: 2,
        spaceBetween: 28,
        loop: true,
        speed: 7000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        breakpoints: {
          520: {
            slidesPerView: 2.5,
            spaceBetween: 48
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 64
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 80
          },
          1400: {
            slidesPerView: 5.2,
            spaceBetween: 92
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
}
