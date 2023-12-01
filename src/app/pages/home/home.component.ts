import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

interface ISlide {
  img: string;
  title?: string;
  body?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
      })),
      transition(':enter, :leave', animate(300)),
    ]),
  ],
})
export class HomeComponent {

  activeIndex: number = 0;
  playCarousel: boolean = false;

  slides: ISlide[] = [
    {
      img: 'assets/pokemon/walls/1.jpg',
    },
    {
      img: 'assets/pokemon/walls/2.jpg',
    },
    {
      img: 'assets/pokemon/walls/3.jpg',
    },
  ];
  autoPlay: any | undefined;

  ngOnInit() {
    this.startAutoPlay();
  }
  
  setBg(url: string): {} {
    return {
      'background-image': `url(${url})`,
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
    }
  }
  
  startAutoPlay() {
    this.autoPlay = setInterval(() => this.next(), 4 * 1000);
  }
  
  restartAutoPlay() {
    clearInterval(this.autoPlay);
    this.startAutoPlay();
  }

  prev() {
    this.activeIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length;
    this.restartAutoPlay();
  }

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    this.restartAutoPlay();
  }

  ngOnDestroy() {
    if (this.autoPlay) clearInterval(this.autoPlay);
  }

}
