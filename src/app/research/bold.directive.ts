import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bold]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class BoldDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
  }

  onMouseEnter() {
    this.setFontWeight('bold');
  }

  onMouseLeave() {
    this.setFontWeight('normal');
  }

  private setFontWeight(val: string) {
    this.renderer.setStyle(this.element.nativeElement, 'font-weight', val);
  }
}


`export class BoldDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');
    //this.elementRef.nativeElement.style.fontWeight = 'bold';
  }

  //event attacher
  @HostListener('mouseenter') onMouseEnter() {
    this.setFontWeight('bold');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setFontWeight('normal');
  }

  private setFontWeight(val: string) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', val);
  }
}

export class BoldDirective {

  private fontWeight = 'normal';

  //binding style to property
  @HostBinding('style.fontWeight') get getFontWeight() {
    return this.fontWeight;
  }

  @HostBinding('style.cursor') get getCursor() {
    return 'pointer';
  }

  //event attacher
  @HostListener('mouseenter') onMouseEnter() {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.fontWeight = 'normal';
  }
}`