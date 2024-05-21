# NgxTrumbowyg [![npm version](https://badge.fury.io/js/ngx-trumbowyg.svg)](https://badge.fury.io/js/ngx-trumbowyg)

This an Angular 17 component and a directive wrapper for [Trumbowyg WYSIWYG editor](https://alex-d.github.io/Trumbowyg/).

## Getting started

1.  Run `npm install --save ngx-trumbowyg` or `yarn add ngx-trumbowyg`

2.  Add trumbowyg and jquery to your scripts.

```json
...
"scripts": [
  "./node_modules/jquery/dist/jquery.js",
  "./node_modules/trumbowyg/dist/trumbowyg.min.js"
]
...
```

3.  Import trumbowyg's css: `@import "~trumbowyg/dist/ui/trumbowyg.min.css";`

4.  Copy trumbowyg's icons where ever you want.

    Unix ex: `cp node_modules/trumbowyg/dist/ui/icons.svg src/assets`

    Windows ex: `xcopy /I /E node_modules/trumbowyg/dist/ui/icons.svg src/assetscd`

## Usage

### Module Based Angular Project

You can import `NgxTrumbowygModule` as many of your modules as you like.

The component and the directive both supports `FormsModule` and `ReactiveFormsModule`.

```html
<form #f="ngForm">
    <ngx-trumbowyg-editor name="editor" [(ngModel)]="model"></ngx-trumbowyg-editor>
    <textarea ngxTrumbowygEditor name="editorDirective" [(ngModel)]="model"></textarea>
</form>
```

```html
<form [formGroup]="form">
    <ngx-trumbowyg-editor formControlName="model"></ngx-trumbowyg-editor>
    <textarea ngxTrumbowygEditor formControlName="model"></textarea>
</form>
```

It also supports common input attributes like:

- disabled
- required
- placeholder

There are two ways to provide configuration:

1.  At module level

```typescript
@NgModule({
    declarations: [...],
    imports: [
        ...
        NgxTrumbowygModule.withConfig({
            lang: 'hu',
            svgPath: '/assets/ui/icons.svg',
            removeformatPasted: true,
            autogrow: true,
            btns: [
                ['formatting'],
                ['strong', 'em', 'del'],
                ['superscript', 'subscript'],
                ['link'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ['unorderedList', 'orderedList'],
                ['horizontalRule'],
                ['removeformat'],
                ['fullscreen']
            ],
            // Some plugins, like emoji, has a prerequisite to run certain functions at certain DOM events.
            // Please keep in mind that some events are protected for the sake of this library.
            // Protected events: tbwinit, tbwchange, tbwfocus
            // You can register events like this:
            events: {
              'input propertychange': () => {
                // Setup emojify.js
                emojify.setConfig({
                    img_dir : '//cdnjs.cloudflare.com/ajax/libs/emojify.js/1.1.0/images/basic/',
                });
                emojify.run();
              }
            }
        })
    ],
    providers: [...],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

2.  You can pass a `TrumbowygOptions` via `[options]="options"` for both the component or the directive.

Or you can use the combination of the two shown above.

Lets assume you want to configure the `NgxTrumbowygModule` at module level, but at some point you want to create an editor with a different behaviour.

In order to do that all you need to do is to pass an `TrumbowygOptions` via `<ngx-trumbowyg-editor [options]="options"></ngx-trumbowyg-editor>` that will override the global configuration for that particular editor instance.

If you don't want to provide any configuration just import `NgxTrumbowygModule` and the default Trumbowyg's settings will be applied.

### Standalone Angular Project (Default)

In Angular 17, the classes are marked as standalone by default. Below are the steps for implementing the same.

1. In `app.config.ts` file

```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxTrumbowygModule } from '../../projects/ngx-trumbowyg/src/public-api';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      [
        NgxTrumbowygModule.withConfig({
          lang: 'hu',
          svgPath: '/assets/ui/icons.svg',
          removeformatPasted: true,
          autogrow: true,
          btns: [
            ['formatting'],
            ['strong', 'em', 'del'],
            ['superscript', 'subscript'],
            ['link'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['unorderedList', 'orderedList'],
            ['horizontalRule'],
            ['removeformat'],
            ['fullscreen'],
            ['insertImage']
          ],
          events: {}
        })
      ]
    )
  ]
};
```

2. In component level add `NgxTrumbowygModule` in the `imports` array.

```typescript
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
```

Rest all implementations are similar to the section `Module Based Angular Project`.

