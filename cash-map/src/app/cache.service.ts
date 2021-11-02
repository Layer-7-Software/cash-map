import { Injectable } from '@angular/core';
import { Budget } from './models/Budget';
import { IncomeInterval } from './models/IncomeInterval';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  defaults = {
    incomeInterval: IncomeInterval.Yearly
  };

  constructor() { }

  save(budget: Budget): void {
    localStorage.setItem('cashmap-budget', JSON.stringify(budget));
  }

  load(): Budget {
    const cache = localStorage.getItem('cashmap-budget');
    return cache ? this.parseCache(cache) : new Budget();
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

  private parseCache(cache: string): Budget {
    let parsed: Budget = JSON.parse(cache);
    this.setDefaults(parsed);
    return parsed;
  }

  private setDefaults(parsed: Budget) {
    if (!parsed) {
      return;
    }

    if (parsed.incomeInterval == undefined || parsed.incomeInterval == IncomeInterval.None) {
      parsed.incomeInterval = this.defaults.incomeInterval;
    }
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
