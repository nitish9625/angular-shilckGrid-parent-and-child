import { Component } from '@angular/core';

@Component({
  selector:'loader-app',
  template:
    `<h4 class=" mt-4 mx-4">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      Loading...
    </h4>`
})
export class SpinnerComponent {}
