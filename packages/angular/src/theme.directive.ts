import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { ThemeService } from './theme.service';
import { themeToCSSVars, injectThemeTransition } from '@ui-kit/core/src/themes/globalStyles';

@Directive({
  selector: '[uiTheme]',
})
export class ThemeDirective implements OnChanges {
  @Input('uiTheme') theme: any;

  constructor(private el: ElementRef, private themeService: ThemeService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['theme'] && this.theme) {
      injectThemeTransition(this.el.nativeElement); // Smooth transition on theme change
      const cssVars = themeToCSSVars(this.theme);
      this.applyCSSVars(cssVars);
    }
  }

  private applyCSSVars(css: string) {
    this.el.nativeElement.style.cssText += css;
  }
}
