import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

/**
 * Standalone Angular component wrapper for a Web Component.
 * Usage: import and use directly in Angular 14+ standalone apps.
 */
@Component({
  selector: 'ui-standalone-web-component',
  template: `<ng-content></ng-content>`,
  standalone: true,
})
export class StandaloneWebComponent implements AfterViewInit, OnDestroy {
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const nativeEl = this.el.nativeElement;
    nativeEl.addEventListener('input', (e: any) => {
      this.value = e.target.value;
      this.valueChange.emit(this.value);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {}
}
