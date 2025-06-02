import { Component } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify.service';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  constructor(private spotifyService: SpotifyService) {}

  async fetchProfile(token: string): Promise<any> {
    const result = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!result.ok) {
      throw new Error('Failed to fetch profile');
    }

    return await result.json();
  }

  async authenticate(): Promise<void> {
    document.location = `http://127.0.0.1:4200/login`;
  }
}
