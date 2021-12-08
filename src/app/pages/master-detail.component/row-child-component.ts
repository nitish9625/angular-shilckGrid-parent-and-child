import { RowDetailsComponent } from './row-detail.component';
import { Component, OnInit } from "@angular/core";
import { RowDetailView } from "angular-slickgrid";
import { SlickDataView, SlickGrid } from 'angular-slickgrid';

@Component({
    selector:'row-child-app',
   templateUrl:'./row-child.component.html' 
})

export class RowChildComponent implements OnInit{

    model !: {
        duration: Date;
        reporter: string;
        start: Date;
        finish: Date;
        effortDriven: boolean;
        assignee: string;
        title: String;
        adden: any;};
        
        grid !: SlickGrid;
        dataView !: SlickDataView;
        parent !: RowDetailsComponent
    

    ngOnInit(){

    }

    gotToLink(urls: string){
        window.open(urls, '_blank', 'location=yes,height=600,width=800,scrollbars=yes,status=yes')
    }
}