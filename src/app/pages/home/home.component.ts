import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutPreviewComponent } from './sections/about-preview/about-preview.component';
import { TargetAudiencesComponent } from './sections/target-audiences/target-audiences.component';
import { ServicesPreviewComponent } from './sections/services-preview/services-preview.component';
import { CapabilitiesComponent } from './sections/capabilities/capabilities.component';
import { PreviousWorkComponent } from './sections/previous-work/previous-work.component';
import { PreviousClientsComponent } from './sections/previous-clients/previous-clients.component';
import { HomeCtaComponent } from './sections/home-cta/home-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutPreviewComponent,
    TargetAudiencesComponent,
    ServicesPreviewComponent,
    CapabilitiesComponent,
    PreviousWorkComponent,
    PreviousClientsComponent,
    HomeCtaComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
