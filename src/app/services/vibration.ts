import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VibrationService {
  vibrate(pattern: number | number[]): void {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }
}