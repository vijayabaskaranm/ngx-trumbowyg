import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { NgxTrumbowygModule, TrumbowygOptions } from 'ngx-trumbowyg';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    ReactiveFormsModule, 
    FormsModule, 
    JsonPipe,
    NgxTrumbowygModule
  ]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  form: FormGroup;

  options: TrumbowygOptions;

  model = '';

  modelWithContent = 'fooBar';

  lazyContent!: string;

  private _sub!: Subscription;

  constructor(private _fb: FormBuilder) {
    this.options = { lang: 'en' };
    this.form = this._fb.group({
      foo: [{ value: '', disabled: false }]
    });
  }

  ngAfterViewInit(): void {
    this._sub = of('fooBar')
      .pipe(delay(1000))
      .subscribe(string => {
        this.lazyContent = string;
      });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  toggleDisabled(): void {
    const control = this.form.get('foo');
    if (control) {
      if (control.disabled) {
        control.enable();
      } else {
        control.disable();
      }
    }
  }
}
