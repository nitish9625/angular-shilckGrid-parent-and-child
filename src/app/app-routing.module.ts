import { ParentComponent } from './pages/parent-to-child/parent-component';
import { RowDetailsComponent } from './pages/master-detail.component/row-detail.component';
import { FrezoComponent } from './pages/sikl-frezo/silck-frezo.component';
import { GraphicQlComponent } from './pages/graphicQl/graphicql.component';
import { GraphicqlWithSilckGridComponent } from './pages/graphicql-with-silck-grid/graphicql-with-silck-grid.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForezeGridComponent } from './pages/foreze-grid/foreze-grid.component';
import { RowChildComponent } from './pages/master-detail.component/row-child-component';

const routes: Routes = [
  {path:'graphic-With-silckGrid', component:GraphicqlWithSilckGridComponent},
  {path:'graphicql', component:GraphicQlComponent},
  {path:'silck-frezo', component: FrezoComponent},
  {path:'feroze-grid', component: ForezeGridComponent},
  {path:'row-detail', component: RowDetailsComponent},
  {path:'Parent', component: ParentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
