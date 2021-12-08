import { Component } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './graphicql.component.html',
})
export class GraphicQlComponent {
  rates: any = [];
  loading = true;
  error: any;

  public apolloData:any;
 
  constructor(private apollo: Apollo) {}

  ngOnInit() {
  this.getApolloData();
  this.getData();
     
  }

  getApolloData(){
    this.apolloData = this.apollo
    .watchQuery({
      query: gql`
        {
          rates(currency: "USD") {
            currency
            rate
            name
          }
        }
      `,
    })
    console.log('get apollo data', this.apolloData);
  }

  getData(){
    this.apolloData.valueChanges
      .subscribe((result: any)=>{
        console.log('result', result);
        this.rates = result?.data?.rates;
        this.loading = result.loading;
        this.error = result.error;
        console.log('this rates', )
      });
    
  }
}