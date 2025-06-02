import { Component } from '@angular/core';
import { DimCardComponent } from './components/dim-card/dim-card.component';
import { SpotifyService } from '../../core/services/spotify.service';
import { LocalStorageService } from '../../core/services/local-storage.service';

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

  protected profileData: any;
  protected topArtists: any[] = [];

  constructor(private spotifyService: SpotifyService, private localStorageService: LocalStorageService) {}

  async ngOnInit(): Promise<void> {
    // Initialization logic can go here if needed
    const temp = await this.spotifyService.fetchProfile();
    this.profileData = temp;
    console.log('Profile Data:', this.profileData);

    const temp2 = await this.spotifyService.fetchTopArtists();
    console.log(temp2)
    this.topArtists = temp2.items;
  }

  async goToProfile(): Promise<void> {
    if (this.profileData && this.profileData.external_urls && this.profileData.external_urls.spotify) {
      window.open(this.profileData.external_urls.spotify, '_blank');
    } else {
      console.error('Profile data is not available or does not contain a valid Spotify URL.');
    }
  }

  logout(): void {
    this.localStorageService.clear();
    document.location = 'http://127.0.0.1:4200/';
  }
}
