import { AfterViewInit, Directive, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TRUMBOWYG_OPTIONS } from '../configs/injection-token';
import { TrumbowygOptions } from '../configs/trumbowyg-options';

declare const $: any;
@Directive()
export abstract class EditorBase implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  options!: TrumbowygOptions | null;

  placeholder!: string | null;

  protected _editor!: ElementRef;

  protected _initValue!: string;

  private _disabled!: boolean;

  private _onChange!: (value: string) => void;

  private _onTouch!: () => void;

  constructor(protected editorControl: NgControl, @Inject(TRUMBOWYG_OPTIONS) protected _config: TrumbowygOptions) {
    if (
      _config &&
      _config.events &&
      (_config.events['tbwinit'] || _config.events['tbwchange'] || _config.events['tbwfocus'])
    ) {
      throw new Error(
        'Forbidden event registration. These events are protected for the Ngx-Trumbowyg library: tbwinit, tbwchange, tbwfocus'
      );
    }
    editorControl.valueAccessor = this;
  }

  ngOnInit(): void {
    // @ts-ignore: Object is possibly 'null'.
    const control = this.editorControl?.control;
    control?.setValidators(control.validator);
    control?.updateValueAndValidity();
  }

  ngAfterViewInit(): void {
    const editor = $(this._editor.nativeElement)
      .trumbowyg({ ...this._config, ...this.options })
      .on('tbwinit', () => {
        this.setDisabledState(this._disabled);
        this.setContent(this._initValue);
      })
      .on('tbwchange', () => {
        this._onChange(this.getContent());
      })
      .on('tbwfocus', () => {
        this._onTouch();
      });

    if (this._config && this._config.events) {
      const events = this._config.events;
      Object.keys(events).forEach(eventName => {
        editor.on(eventName, events[eventName]());
      });
    }
  }

  registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

  writeValue(value: any): void {
    this._initValue = value;

    if (this._editor && this._editor.nativeElement) {
      this.setContent(value);
    }
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = disabled;

    if (this._editor) {
      $(this._editor.nativeElement).trumbowyg(this._disabled ? 'disable' : 'enable');
    }
  }

  ngOnDestroy(): void {
    $(this._editor.nativeElement).trumbowyg('destroy');
  }

  private setContent(content: string): void {
    $(this._editor.nativeElement).trumbowyg('html', content);
  }

  private getContent(): string {
    return $(this._editor.nativeElement).trumbowyg('html');
  }
}
