import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GraphqlService, GraphqlResult, GraphqlServiceApi} from '@slickgrid-universal/graphql';
import { AngularGridInstance, Column, Filters, Formatters, GridOption, Metrics, MultipleSelectOption, OperatorType } from 'angular-slickgrid';
import { Observable } from 'rxjs';
import { Country } from './graphic.model';
import { query } from '@angular/animations';

const COUNTRIES_API = 'https://countries.trevorblades.com/';


@Component({
  selector: 'app-graphicql-with-silck-grid',
  templateUrl: './graphicql-with-silck-grid.component.html',
  styleUrls: ['./graphicql-with-silck-grid.component.css']
})
export class GraphicqlWithSilckGridComponent implements OnInit {

  angularGrid !:AngularGridInstance;
  columnDefinitions !: Column[];
  gridOptions !: GridOption;
  dataset = [];
  metrics !: Metrics;
  graphqlQuery = '';
  processing = true;
  status = {text:'processing...', class:'alert-danger'}
  isDataLoaded = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.columnDefinitions = [
      {id:'countryCode', field:'code', name:'Code', maxWidth:90,sortable:true, filterable: true, columnGroup:'Country'},
      {id:'companyName', field:'name', name:'Name', maxWidth:90, columnGroup:'Country'},
      {id:'countryPhone', field:'phone', name:'Phone Area Code', maxWidth: 90, columnGroup:'Country'},
      {id:'countryCurrency', field:'currency', name:'Currency', maxWidth: 90, columnGroup:'Country'},
      {
        id: 'languageName', field: 'languages.name', name: 'Names', maxWidth: 90,
        formatter: Formatters.arrayObjectToCsv, columnGroup: 'Language',
        params: { propertyNames: ['name'], useFormatterOuputToFilter: true }},
        {
          id: 'StateName', field: 'states.name', name: 'Names', maxWidth: 90,
          formatter: Formatters.arrayObjectToCsv, columnGroup: 'State',
          params: { propertyNames: ['name'], useFormatterOuputToFilter: true }},
          {
            id: 'continentName', field: 'continent.name', name: 'Name',maxWidth: 90, formatter: Formatters.complexObject, columnGroup: 'Continent'
          },
         
       
    ];

    this.gridOptions = {
      autoResize: {
        container: '#demo-Container',
        rightPadding: 10
      },
      enableFiltering: true,
      enableCellNavigation: true,
      enablePagination: false,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight:28,
      datasetIdPropertyName:'code',
      showCustomFooter: true,
      backendServiceApi: {
        service: new GraphqlService(),
        useLocalFiltering: true,
        options:{
          datasetName:'countries'
        },
        preProcess: ()=> !this.isDataLoaded ? this.displaySpinner(true): '',
        process: (query: string)=> this.getCountries(query),
        
        postProcess: (result: GraphqlResult<Country>)=>{
          this.metrics = result.metrics as Metrics;
          this.displaySpinner(false);
          this.isDataLoaded = true;
        }
      }as GraphqlServiceApi
      
      
    };
   
  }
  displaySpinner(isProcessing: boolean){
    this.processing = isProcessing;
    this.status = (isProcessing)
    ? {text:'processing....', class:'alert alert-danger'}
    : {text:'done', class:'alert alert-success'}
  }

  getCountries(query: string):Observable<GraphqlResult<Country>>{
  
    return this.http.post<GraphqlResult<Country>>(COUNTRIES_API, {query});
   
  }


}
