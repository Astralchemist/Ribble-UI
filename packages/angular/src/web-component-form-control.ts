// Angular ControlValueAccessor for Web Component form integration.
import { Directive, forwardRef, Input, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[uiWebComponentFormControl]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WebComponentFormControlDirective),
      multi: true,
    },
  ],
})
export class WebComponentFormControlDirective implements ControlValueAccessor {
  @Input() value: any;
  private onChange = (_: any) => {};
  private onTouched = () => {};

  @HostListener('input', ['$event.target.value'])
  onInput(val: any) {
    this.value = val;
    this.onChange(val);
  }

  writeValue(val: any) {
    this.value = val;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean) {}
}
