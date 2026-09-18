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
    { id: 'moi', name: 'وزارة الداخلية', logo: '/assets/clients/وزارة_الداخلية-removebg-preview.webp' },
    { id: 'mofa', name: 'وزارة الخارجية', logo: '/assets/clients/وزارة_الخارجية-removebg-preview.webp' },
    { id: 'moe', name: 'وزارة التعليم', logo: '/assets/clients/وزارة_التربية_والتعليم-removebg-preview.webp' },
    { id: 'dgda', name: 'بوابة الدرعية', logo: '/assets/clients/بوابة_الدرعية-removebg-preview.webp' },
    { id: 'kafd', name: 'المركز المالي', logo: '/assets/clients/المركز_المالي-removebg-preview.webp' },
    { id: 'riyad-bank', name: 'بنك الرياض', logo: '/assets/clients/بنك_الرياض-removebg-preview.webp' },
    { id: 'sec', name: 'الشركة السعودية للكهرباء', logo: '/assets/clients/شركة_الكهرباء-removebg-preview.webp' },
    { id: 'ajlan', name: 'شركة العجلان وإخوانه', logo: '/assets/clients/شركة_العجلان-removebg-preview.webp' },
    { id: 'kkia', name: 'مطار الملك خالد الدولي', logo: '/assets/clients/مطار_الملك_خالد-removebg-preview.webp' },
    { id: 'matarat', name: 'شركة مطارات القابضة', logo: '/assets/clients/مطارات_القابضة-removebg-preview.webp' },
    { id: 'alhilal', name: 'نادي الهلال السعودي', logo: '/assets/clients/نادي_الهلال-removebg-preview.webp' },
    { id: 'fsf', name: 'قوات أمن المنشآت', logo: '/assets/clients/قوات_امن_المنشآت-removebg-preview.webp' },
    { id: 'prisons', name: 'المديرية العامة للسجون', logo: '/assets/clients/المديرية_العامة_للسجون-removebg-preview.webp' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.clientSwiper) {
      this.swiperInstance = new Swiper(this.clientSwiper.nativeElement, {
        modules: [Autoplay],
        slidesPerView: 1.8,
        spaceBetween: 32,
        loop: true,
        speed: 7000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        breakpoints: {
          480: {
            slidesPerView: 2.2,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 52
          },
          1024: {
            slidesPerView: 3.8,
            spaceBetween: 64
          },
          1360: {
            slidesPerView: 4.5,
            spaceBetween: 76
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
