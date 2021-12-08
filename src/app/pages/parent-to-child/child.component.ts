import { Component, OnInit , Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector:'child-app',
templateUrl:'./child.component.html'
})

export class ChildComponent implements OnInit{
@Input() dataSend: any

@Output() parentToChild: EventEmitter<any> = new EventEmitter();

ngOnInit(){
   
}

shiwChild(){
    let data = {name: 'Nitis', id: 23}
    this.parentToChild.emit(data);
}
}