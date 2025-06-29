import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Angular wrapper for a Web Component with change detection and binding.
 * Usage: selector: 'ui-web-component', inputs/outputs as needed.
 */
@Component({
  selector: 'ui-web-component',
  template: `<ng-content></ng-content>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WebComponentWrapper),
      multi: true,
    },
  ],
  standalone: true,
})
export class WebComponentWrapper implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const nativeEl = this.el.nativeElement;
    nativeEl.addEventListener('input', (e: any) => {
      this.value = e.target.value;
      this.valueChange.emit(this.value);
      this.onChange(this.value);
      this.cdr.markForCheck();
    });
  }

  writeValue(val: any) {
    this.value = val;
    this.el.nativeElement.value = val;
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean) {
    this.el.nativeElement.disabled = isDisabled;
  }

  ngOnDestroy() {}
}
