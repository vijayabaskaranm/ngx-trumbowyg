import { Directive, ElementRef, Inject, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EditorBase } from '../commons/editor-base';
import { TrumbowygOptions } from '../configs/trumbowyg-options';
import { TRUMBOWYG_OPTIONS } from '../configs/injection-token';

@Directive({
  selector: '[ngxTrumbowygEditor]'
})
export class EditorDirective extends EditorBase {
  @Input() override options!: TrumbowygOptions | null;

  @Input() override placeholder!: string | null;

  constructor(
    protected override editorControl: NgControl,
    @Inject(TRUMBOWYG_OPTIONS)
    @Optional()
    protected override _config: TrumbowygOptions,
    protected override _editor: ElementRef
  ) {
    super(editorControl, _config);
  }
}
