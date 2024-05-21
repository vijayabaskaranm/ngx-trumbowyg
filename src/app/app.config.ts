import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';

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
