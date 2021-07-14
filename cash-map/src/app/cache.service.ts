import { Injectable } from '@angular/core';
import { Budget } from './models/Budget';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  save(budget: Budget): void {
    localStorage.setItem('cashmap-budget', JSON.stringify(budget));
  }

  load(): Budget {
    const cache = localStorage.getItem('cashmap-budget');
    return cache ? JSON.parse(cache) : new Budget();
  }

  clear(): void {
    localStorage.clear();
  }

  download(): void {
    const cache = this.load();
    const cacheJson = JSON.stringify(cache);
    let blob = new Blob([cacheJson], { type: 'text/json' });
    this.downloadBlob(blob, 'Cash Map.json');
  }

  private downloadBlob(blob: Blob, fileName: string): void {
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }
}
