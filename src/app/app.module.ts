import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { GraphicqlWithSilckGridComponent } from './pages/graphicql-with-silck-grid/graphicql-with-silck-grid.component';
import { GraphicQlComponent } from './pages/graphicQl/graphicql.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { FrezoComponent } from './pages/sikl-frezo/silck-frezo.component';
import { FormsModule } from '@angular/forms';
import { ForezeGridComponent } from './pages/foreze-grid/foreze-grid.component';
import { RowDetailsComponent } from './pages/master-detail.component/row-detail.component';
import { RowChildComponent } from './pages/master-detail.component/row-child-component';
import { SpinnerComponent } from './pages/master-detail.component/spinner.component';
import { ParentComponent } from './pages/parent-to-child/parent-component';
import { ChildComponent } from './pages/parent-to-child/child.component';


@NgModule({
  declarations: [
    AppComponent,
    GraphicqlWithSilckGridComponent,
    GraphicQlComponent,
    FrezoComponent,
    ForezeGridComponent,
    RowDetailsComponent,
    RowChildComponent,
    SpinnerComponent,
    ParentComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, AngularSlickgridModule.forRoot(),
    FormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://48p1r2roz4.sse.codesandbox.io',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
