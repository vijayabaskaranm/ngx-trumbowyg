import {
  Component,
  ElementRef,
  Inject,
  Input,
  Optional,
  ViewChild
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { EditorBase } from '../../commons/editor-base';
import { TRUMBOWYG_OPTIONS } from '../../configs/injection-token';
import { TrumbowygOptions } from '../../configs/trumbowyg-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-trumbowyg-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent extends EditorBase {
  @Input() override options!: TrumbowygOptions | null;

  @Input() override placeholder!: string | null;

  @ViewChild('editor') override _editor!: ElementRef;

  constructor(
    protected override editorControl: NgControl,
    @Inject(TRUMBOWYG_OPTIONS)
    @Optional()
    protected override _config: TrumbowygOptions
  ) {
    super(editorControl, _config);
  }
}
