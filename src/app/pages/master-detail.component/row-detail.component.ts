import { SpinnerComponent } from './spinner.component';
import { Component, OnInit } from "@angular/core";
import { AngularGridInstance,  Column,
    ExtensionList,
    FieldType,
    Filters,
    Formatters,
    GridOption } from "angular-slickgrid";
    import { RowChildComponent } from "./row-child-component";
    const NB_ITEMS = 500;
@Component({
    selector:'row-details-app',
    styles:[
      `
      .slick-row .dynamic-cell-detail{
        height: auto !important;
      }
      `
    ],
   templateUrl:'./row-details.components.html',
  
})

export class RowDetailsComponent implements OnInit{
    angularGrid!: AngularGridInstance;
    columnDefinitions!: Column[];
    gridOptions!: GridOption;
    dataset!: any[];
    extensions!: ExtensionList<any, any>;
    detailViewRowCount = 9;
    message = '';
    flashAlertType = 'info';
    angularGridReady(angularGrid: AngularGridInstance) {
        this.angularGrid = angularGrid;
      }
    
      get rowDetailInstance(): any {
        return this.angularGrid.extensions.rowDetailView.instance || {};
      }
    
      ngOnInit(): void {
        this.defineGrid();
      }
    
      /* Define grid Options and Columns */
      defineGrid() {
        this.columnDefinitions = [
          { id: 'title', name: 'Title', field: 'title', sortable: true, type: FieldType.string, width: 70, filterable: true },
          { id: 'duration', name: 'Duration (days)', field: 'duration', formatter: Formatters.decimal, params: { minDecimal: 1, maxDecimal: 2 }, sortable: true, type: FieldType.number, minWidth: 90, filterable: true },
          // { id: 'percent2', name: '% Complete', field: 'percentComplete2', formatter: Formatters.progressBar, type: FieldType.number, sortable: true, minWidth: 100, filterable: true, filter: { model: Filters.slider, operator: '>' } },
          { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso, sortable: true, type: FieldType.date, minWidth: 90, exportWithFormatter: true, filterable: true, filter: { model: Filters.compoundDate } },
       
         
          
        ];
    
        this.gridOptions = {
          autoResize: {
            container: '#demo-container',
            rightPadding: 10
          },
          enableFiltering: true,
          enableRowDetailView: true,
          autoHeight: true,
          rowSelectionOptions: {
            selectActiveRow: true
          },
          datasetIdPropertyName: 'rowId', // optionally use a different "id"
          rowDetailView: {
            process: (item) => this.simulateServerAsyncCall(item),
            loadOnce: true,
            singleRowExpand: false,
            useRowClick: true,
            panelRows: this.detailViewRowCount,
            preloadComponent: SpinnerComponent,
            viewComponent: RowChildComponent,
            parent: this
          }
        };
    
        this.getData();
      }
    
      getData() {
        // mock a dataset
        this.dataset = [];
        for (let i = 0; i < 200; i++) {
          const randomYear = 2000 + Math.floor(Math.random() * 10);
          const randomMonth = Math.floor(Math.random() * 11);
          const randomDay = Math.floor((Math.random() * 29));
          const randomPercent = Math.round(Math.random() * 100);
    
          this.dataset[i] = {
            rowId: i,
            title: 'Task ' + i,
            duration: (i % 33 === 0) ? null : Math.random() * 100 + '',
            percentComplete: randomPercent,
            percentComplete2: randomPercent,
            percentCompleteNumber: randomPercent,
            start: new Date(randomYear, randomMonth, randomDay),
          };
        }
      }
    
      changeDetailViewRowCount() {
        if (this.angularGrid && this.angularGrid.extensionService) {
          const options = this.rowDetailInstance.getOptions();
          if (options && options.panelRows) {
            options.panelRows = this.detailViewRowCount; // change number of rows dynamically
            this.rowDetailInstance.setOptions(options);
          }
        }
      }
    
    
      simulateServerAsyncCall(item: any) {
    
        const randomNames = ['John Doe', 'Jane Doe', 'Chuck Norris', 'Bumblebee', 'Jackie Chan', 'Elvis Presley', 'Bob Marley', 'Mohammed Ali', 'Bruce Lee', 'Rocky Balboa'];
    
        // fill the template on async delay
        return new Promise((resolve) => {
          setTimeout(() => {
            const itemDetail = item;
    
            // let's add some extra properties to our item for a better async simulation
            itemDetail.assignee = randomNames[this.randomNumber(0, 10)];
            itemDetail.reporter = randomNames[this.randomNumber(0, 10)];
    
            // resolve the data after delay specified
            resolve(itemDetail);
          }, 1000);
        });
      }
    
      private randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    }