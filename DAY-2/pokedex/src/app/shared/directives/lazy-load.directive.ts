import { AfterContentInit, Directive, ElementRef, HostBinding, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyLoadDirective implements AfterContentInit {
  
  @HostBinding('attr.src') srcAttr: string;
  @Input() src: string;

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private el: ElementRef) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterContentInit () {
    if (this.isBrowser) {
      this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
    } else {
      this.loadImage();
    }
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.srcAttr = this.src;
  }

}
