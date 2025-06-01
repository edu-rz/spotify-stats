import { Component } from '@angular/core';
import { DimCardComponent } from './components/dim-card/dim-card.component';

@Component({
  selector: 'app-stats',
  imports: [DimCardComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  protected readonly photoUrl = 'https://blinkbox.co.nz/cdn/shop/files/snoopy_joe-cool_promo.webp?crop=center&height=1500&v=1744593570&width=1500';
  protected artists = [
    { id: 1, name: 'Artist 1' },
    { id: 2, name: 'Artist 2' },
    { id: 3, name: 'Artist 3' },
    { id: 4, name: 'Artist 4' },
    { id: 5, name: 'Artist 5' },
  ];
}
