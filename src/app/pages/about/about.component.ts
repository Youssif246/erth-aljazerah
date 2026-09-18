import { Component } from '@angular/core';
import { AboutHeroComponent } from './sections/about-hero/about-hero.component';
import { StoryComponent } from './sections/story/story.component';
import { VisionComponent } from './sections/vision/vision.component';
import { MissionComponent } from './sections/mission/mission.component';
import { GoalsComponent } from './sections/goals/goals.component';
import { ValuesComponent } from './sections/values/values.component';
import { Vision2030Component } from './sections/vision-2030/vision-2030.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    AboutHeroComponent,
    StoryComponent,
    VisionComponent,
    MissionComponent,
    GoalsComponent,
    ValuesComponent,
    Vision2030Component
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {}
