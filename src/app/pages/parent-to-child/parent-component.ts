import { OnInit, Component , Input} from "@angular/core";
import { ParentChildService } from "./parent-child.service";
@Component({
    templateUrl:'./parent.component.html'
})

export class ParentComponent implements OnInit{

    public apiData: any;
    public childData: any;
    
    constructor(public PareChildService: ParentChildService){

    }

    ngOnInit(){
        this.getFakeData();
        
    }

getFakeData(){
    this.PareChildService.getFakeData()
    .then((res)=>{
        this.apiData = res;
    })
}

getChild(data: any){
    this.childData = data;
}
}