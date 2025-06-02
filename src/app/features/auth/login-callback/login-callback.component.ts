import { Component } from '@angular/core';
import { SpotifyService } from '../../../core/services/spotify.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-callback',
  imports: [],
  templateUrl: './login-callback.component.html',
  styleUrl: './login-callback.component.css',
})
export class LoginCallbackComponent {
  private readonly clientId = 'b68bd256090348f8acc4f9f0fefd152f';
  constructor(private spotifyService: SpotifyService, private localStorageService: LocalStorageService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      const code = new URLSearchParams(window.location.search).get('code');

      if (!code) {
        throw new Error('Authorization code not found in URL');
      }

      const accessToken = await this.spotifyService.getAccessToken(this.clientId, code);

      if (!accessToken) {
        throw new Error('Failed to retrieve access token');
      }

      this.localStorageService.setItem('access_token', accessToken);
      await this.router.navigate(['/stats']);
    } catch (error) {
      console.error('Authentication error:', error);
      await this.router.navigate(['/']);
    }
  }
}
