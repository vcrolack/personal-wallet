import {
  Component,
  ContentChildren,
  QueryList,
  OnInit,
  OnDestroy,
  HostListener,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselSlideDirective } from './carousel-slide.directive';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy {
  @ContentChildren(CarouselSlideDirective)
  slides!: QueryList<CarouselSlideDirective>;

  public currentIndex = signal(0);
  private intervalId: any;
  private readonly AUTO_PLAY_INTERVAL = 30000;
  public isHovered = signal(false);

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered.set(true);
    this.stopAutoPlay();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered.set(false);
    this.startAutoPlay();
  }

  public next(): void {
    const total = this.slides?.length || 0;
    if (total === 0) return;
    this.currentIndex.set((this.currentIndex() + 1) % total);
  }

  public prev(): void {
    const total = this.slides?.length || 0;
    if (total === 0) return;
    this.currentIndex.set((this.currentIndex() - 1 + total) % total);
  }

  public goToSlide(index: number): void {
    this.currentIndex.set(index);
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.intervalId = setInterval(() => {
      this.next();
    }, this.AUTO_PLAY_INTERVAL);
  }

  private stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public get totalSlides(): number {
    return this.slides?.length || 0;
  }
}
