import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private localStorageService: LocalStorageService) {}

  async redirectToAuthCodeFlow(clientId: string) {
    const verifier = this.generateCodeVerifier(128);
    const challenge = await this.generateCodeChallenge(verifier);

    this.localStorageService.setItem('verifier', verifier);
    console.log('Code Verifier:', verifier);

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', 'http://127.0.0.1:4200/login/callback');
    params.append('scope', 'user-read-private user-read-email user-top-read');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async getAccessToken(clientId: string, code: string) {
    try {
      const verifier = this.localStorageService.getItem<string>('verifier');
      if (!verifier) {
        throw new Error('Code verifier not found');
      }

      const params = new URLSearchParams();
      params.append('client_id', clientId);
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', 'http://127.0.0.1:4200/login/callback');
      params.append('code_verifier', verifier!);

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Spotify API Error:', errorData);
        throw new Error(`Failed to get access token: ${response.status}`);
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error in getAccessToken:', error);
      throw error;
    }
  }

  generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async fetchProfile(): Promise<any> {
    try {
      const accessToken = this.localStorageService.getItem<string>('access_token');
      if (accessToken) {
        const result = await fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!result.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await result.json();
        return data;
      } else {
        throw new Error('Access token not found in local storage');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  async fetchTopArtists(): Promise<any> {
    try {
      const accessToken = this.localStorageService.getItem<string>('access_token');
      if (accessToken) {
        const result = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!result.ok) {
          throw new Error('Failed to fetch Top Artists');
        }
        const data = await result.json();
        console.log(data);
        return data;
      } else {
        throw new Error('Access token not found in local storage');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }
}
