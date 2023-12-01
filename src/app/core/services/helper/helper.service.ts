import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  toJSON(s: string): any {
    return JSON.parse(s);
  }

  extractImages(data: any): string[] {
    const imageUrls: any[] = [];

    function traverse(obj: any) {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].startsWith('https://')) imageUrls.push(obj[key]);
        else if (typeof obj[key] === 'object' && obj[key] !== null) traverse(obj[key]);
      }
    }

    traverse(data);
    return imageUrls;
  }
  
  getPokeTypeBG(type: string): string {
    switch (type.toLowerCase()) {
      case 'fire':
        return 'bg-danger-subtle text-danger-emphasis';
      case 'water':
        return 'bg-light text-light-emphasis';
      case 'grass':
        return 'bg-success-subtle text-success-emphasis';
      case 'bug':
        return 'bg-warning-subtle text-warning-emphasis';
      default:
        return 'bg-secondary-subtle text-secondary-emphasis';
    }
  }

  getTypeIcon(type: string): string {
    return `assets/pokemon/types/${type}.png`;
  }
}
