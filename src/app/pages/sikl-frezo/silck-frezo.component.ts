
import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { AngularGridInstance,  Column, ColumnEditorDualInput, Editors, FieldType, formatNumber, Formatters, Filters, GridOption, SlickNamespace } from "angular-slickgrid";

import { SilkFrezoService } from './service/silk-frezo.service';

declare const Slick: SlickNamespace;

@Component({
    selector: 'frezo-silck',
    templateUrl: './silck-frezo.component.html',
  })
export class FrezoComponent implements OnInit, OnDestroy{

  angularGrid !: AngularGridInstance;
  columnDefinitions !: Column [];
  gridOptions !: GridOption;
  dataset !: any[];
  frozenColumnCount = 2;
  frozenRowCount = 3;
  isFrozenBottom = false;
  gridobj: any;
  slickEventHandler: any;

  getdataApi: any;
  loader: boolean = true;
  


    constructor(public silkFrezoService: SilkFrezoService){
      this.slickEventHandler = new Slick.EventHandler();
    }

    ngOnInit(){
      this.preDataGrid();
    }

    ngOnDestroy(){
      this.slickEventHandler.unsubscribeAll();
    }
    angularGridReady(angularGrid: AngularGridInstance) {
      this.angularGrid = angularGrid;
      this.gridobj = angularGrid.slickGrid;
  
    
      this.slickEventHandler.subscribe(this.gridobj.onMouseEnter, (event: Event) => this.highlightRow(event, true));
      this.slickEventHandler.subscribe(this.gridobj.onMouseLeave, (event: Event) => this.highlightRow(event, false));
    }
  
    highlightRow(event: Event, isMouseEnter: boolean) {
      const cell = this.gridobj.getCellFromEvent(event);
      const rows = isMouseEnter ? [cell.row] : [];
      this.gridobj.setSelectedRows(rows); // highlight current row
      event.preventDefault();
    }

    preDataGrid(){
      this.columnDefinitions = [
        {
          id: 'sel', name: '#', field: 'id',
          minWidth: 40, width: 40, maxWidth: 40,
          cannotTriggerInsert: true,
          resizable: false,
          unselectable: true,
        },
        {
          id: 'title', name: 'Title', field: 'title',
          minWidth: 100, width: 120,
          filterable: true,
          sortable: true
        },
        {
          id: 'percentComplete', name: '% Complete', field: 'percentComplete',
          resizable: false,
          minWidth: 130, width: 140
        },
        {
          id: 'cost', name: 'Cost | Duration', field: 'cost',
          formatter: this.costDurationFormatter.bind(this),
          minWidth: 150, width: 170,
          sortable: true,
          filter: {
            model: Filters.compoundSlider,
          },
          editor: {
            model: Editors.dualInput,
            params: {
              leftInput: {
                field: 'cost',
                type: 'float',
                decimal: 2,
                minValue: 0,
                maxValue: 50000,
                placeholder: '< 50K',
                errorMessage: 'Cost must be positive and below $50K.',
              },
              rightInput: {
                field: 'duration',
                type: 'float', // you could have 2 different input type as well
                minValue: 0,
                maxValue: 100,
                title: 'make sure Duration is withing its range of 0 to 100',
                errorMessage: 'Duration must be between 0 and 100.',
              },
            } as ColumnEditorDualInput,
          }
        },
      ];
     
      this.gridOptions = {
        autoResize: {
          container: '#demo-container',
          rightPadding: 10
        },
        enableExcelCopyBuffer: true,
        enableCellNavigation: true,
        editable: true,
        autoEdit: true,
        frozenColumn: this.frozenColumnCount,
        frozenRow: this.frozenRowCount,
      };
      this.getfrezoData();
    }

    changeForezenColumnCount(){
      debugger
      if(this.gridobj && this.gridobj.setOptions){
        this.gridobj.setOptions({
          frozenColumn: this.frozenColumnCount
        });
      }
    }

    changeforezenRowCount(){
      debugger
      if(this.gridobj && this.gridobj.setOptions){
        this.gridobj.setOptions({
          frozenRow: this.frozenRowCount
        });
      } 
    }

   

    getData(): any{
      const mockDataSet: any = [];
      for(let i = 0; i< 500; i++){
        mockDataSet[i] ={
          id: i, 
          title: 'Task' + i,
          percentComplete: 'percentage' + i,
          cost: (i%33 === 0)? null: Math.random() * 1000,
          duration: i%8 ? (Math.round(Math.random() * 100)+ ''): null
        }
      }
      return mockDataSet;
    }
    costDurationFormatter(_row: number, _cell: number, _value: any, _columnDef: Column, dataContext: any) {
      const costText = this.isNullUndefinedOrEmpty(dataContext.cost) ? 'n/a' : formatNumber(dataContext.cost, 0, 2, false, '$', '', '.', ',');
      let durationText = 'n/a';
      if (!this.isNullUndefinedOrEmpty(dataContext.duration) && dataContext.duration >= 0) {
        durationText = `${dataContext.duration} ${dataContext.duration > 1 ? 'days' : 'day'}`;
      }
      return `<b>${costText}</b> | ${durationText}`;
    }
  
    isNullUndefinedOrEmpty(data: any) {
      return (data === '' || data === null || data === undefined);
    }
    setFrozenColumns(frozenCols: number) {
      this.gridobj.setOptions({ frozenColumn: frozenCols });
      this.gridOptions = this.gridobj.getOptions();
    }
  

   async getfrezoData(){
      const mockDataSet: any =[];
    let res =  await this.silkFrezoService.getdata()
        .toPromise();
      
       for(let data of res){
        mockDataSet.push({
          id:data.id,
          title: data.name,
          percentComplete: 'percentage' + data.email
        })
       }
       this.dataset = mockDataSet;
       this.loader = false;
    }

}