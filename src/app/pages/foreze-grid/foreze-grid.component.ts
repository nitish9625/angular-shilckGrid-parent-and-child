import { Component, OnInit } from '@angular/core';
import { AngularGridInstance,  Column, ColumnEditorDualInput, Editors, FieldType, formatNumber, Formatters, Filters, GridOption, SlickNamespace } from "angular-slickgrid";
declare const Slick: SlickNamespace;


@Component({
  selector: 'app-foreze-grid',
  templateUrl: './foreze-grid.component.html',
  styleUrls: ['./foreze-grid.component.css']
})
export class ForezeGridComponent implements OnInit {
  title = 'Example 20: Pinned (frozen) Columns/Rows';
  subTitle = `
  This example demonstrates the use of Pinned (aka frozen) Columns and/or Rows (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Pinned-(aka-Frozen)-Columns-Rows" target="_blank">Wiki docs</a>)
  <ul>
      <li>Option to pin any number of columns (left only) or rows</li>
      <li>Option to pin the rows at the bottom instead of the top (default)</li>
      <li>You can also dynamically any of these options, through SlickGrid "setOptions()"</li>
      <li>Possibility to change the styling of the line border between pinned columns/rows</li>
    </ul>
  `;

  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  gridOptions!: GridOption;
  dataset!: any[];
  frozenColumnCount = 2;
  frozenRowCount = 3;
  isFrozenBottom = false;
  gridObj: any;
  slickEventHandler: any;

  constructor() {
    this.slickEventHandler = new Slick.EventHandler();
  }

  ngOnInit(): void {
    this.prepareDataGrid();
  }

  ngOnDestroy() {
    // unsubscribe all SlickGrid events
    this.slickEventHandler.unsubscribeAll();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;

    // with frozen (pinned) grid, in order to see the entire row being highlighted when hovering
    // we need to do some extra tricks (that is because frozen grids use 2 separate div containers)
    // the trick is to use row selection to highlight when hovering current row and remove selection once we're not
    this.slickEventHandler.subscribe(this.gridObj.onMouseEnter, (event: Event) => this.highlightRow(event, true));
    this.slickEventHandler.subscribe(this.gridObj.onMouseLeave, (event: Event) => this.highlightRow(event, false));
  }

  highlightRow(event: Event, isMouseEnter: boolean) {
    const cell = this.gridObj.getCellFromEvent(event);
    const rows = isMouseEnter ? [cell.row] : [];
    this.gridObj.setSelectedRows(rows); // highlight current row
    event.preventDefault();
  }

  prepareDataGrid() {
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
        minWidth: 130, width: 140,
        formatter: Formatters.percentCompleteBar,
        type: FieldType.number,
        filterable: true,
        filter: { model: Filters.slider, operator: '>=' },
        sortable: true
      },
      {
        id: 'start', name: 'Start', field: 'start',
        minWidth: 100, width: 120,
        filterable: true, sortable: true,
        formatter: Formatters.dateIso
      },
      {
        id: 'finish', name: 'Finish', field: 'finish',
        minWidth: 100, width: 120,
        filterable: true, sortable: true,
        formatter: Formatters.dateIso
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
      {
        id: 'effortDriven', name: 'Effort Driven', field: 'effortDriven',
        minWidth: 100, width: 120,
        formatter: Formatters.checkmark,
        filterable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: true, label: 'True' }, { value: false, label: 'False' }],
          model: Filters.singleSelect
        },
        sortable: true
      },
      {
        id: 'title1', name: 'Title 1', field: 'title1',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      },
      {
        id: 'title2', name: 'Title 2', field: 'title2',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      },
      {
        id: 'title3', name: 'Title 3', field: 'title3',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      },
      {
        id: 'title4', name: 'Title 4', field: 'title4',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      }
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
      asyncEditorLoading: true,
      frozenColumn: this.frozenColumnCount,
      frozenRow: this.frozenRowCount,
      // frozenBottom: true, // if you want to freeze the bottom instead of the top, you can enable this property

      gridMenu: { hideClearFrozenColumnsCommand: false },
      headerMenu: { hideFreezeColumnsCommand: false }
    };

    // mock a dataset
    this.dataset = this.getData();
  }

  getData() {
    // Set up some test columns.
    const mockDataset = [];
    for (let i = 0; i < 500; i++) {
      mockDataset[i] = {
        id: i,
        title: 'Task ' + i,
        cost: (i % 33 === 0) ? null : Math.random() * 10000,
        duration: i % 8 ? (Math.round(Math.random() * 100) + '') : null,
        percentComplete: Math.round(Math.random() * 100),
        start: new Date(2009, 0, 1),
        finish: new Date(2009, 4, 5),
        effortDriven: (i % 5 === 0),
        title1: `Some Text ${Math.round(Math.random() * 25)}`,
        title2: `Some Text ${Math.round(Math.random() * 25)}`,
        title3: `Some Text ${Math.round(Math.random() * 25)}`,
        title4: `Some Text ${Math.round(Math.random() * 25)}`,
      };
    }
    return mockDataset;
  }

  /** change dynamically, through slickgrid "setOptions()" the number of pinned columns */
  changeFrozenColumnCount() {
    if (this.gridObj && this.gridObj.setOptions) {
      this.gridObj.setOptions({
        frozenColumn: this.frozenColumnCount
      });
    }
  }

  /** change dynamically, through slickgrid "setOptions()" the number of pinned rows */
  changeFrozenRowCount() {
    if (this.gridObj && this.gridObj.setOptions) {
      this.gridObj.setOptions({
        frozenRow: this.frozenRowCount
      });
    }
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

  onValidationError(e: Event, args: any) {
    alert(args.validationResults.msg);
  }

  setFrozenColumns(frozenCols: number) {
    this.gridObj.setOptions({ frozenColumn: frozenCols });
    this.gridOptions = this.gridObj.getOptions();
  }

  /** toggle dynamically, through slickgrid "setOptions()" the top/bottom pinned location */
  toggleFrozenBottomRows() {
    if (this.gridObj && this.gridObj.setOptions) {
      this.gridObj.setOptions({
        frozenBottom: !this.isFrozenBottom
      });
      this.isFrozenBottom = !this.isFrozenBottom; // toggle the variable
    }
  }
}