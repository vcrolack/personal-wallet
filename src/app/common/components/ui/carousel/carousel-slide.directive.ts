import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCarouselSlide]',
  standalone: true,
})
export class CarouselSlideDirective {
  constructor(public template: TemplateRef<any>) {}
}
