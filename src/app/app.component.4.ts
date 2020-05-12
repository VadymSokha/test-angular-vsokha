import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService} from './http.service';
import { Worker} from './worker';
//import { Project} from './project';
//import { Prworker} from './prworker';

@Component({
    selector: 'select-worker',
    template: `	<select [(ngModel)]="valueDef" (ngModelChange)="change(valueDef);">
				<option [value]=0>&nbsp;&nbsp;---&nbsp;исключить из проекта---</option>
				<option *ngFor="let worker of workers" class="wSelect" [value]="worker.regnum">
					{{worker.lastname}}&nbsp;{{worker.firstname}}&nbsp;{{worker.secondname}}
				</option></select>`,
    providers: [HttpService],
	styles: [`
			select {
				 width: 100%;
			}
			`]
})


export class App4Component implements OnInit { 
   
    workers: Worker[]=[];
    error: any;
	@Input() valueDef: number;
    

    constructor(private httpService: HttpService){}
      
    ngOnInit(){
        this.httpService.getData('workersList').subscribe(data => this.workers=data["workersList"],
            error => {this.error = error.message; console.log(error);});
    }
    
	@Output() onChange = new EventEmitter<number>();
	
	change(chooseWorker: number){;
		console.log(this.valueDef+" <-- "+chooseWorker);
		this.valueDef = chooseWorker;
		this.onChange.emit(chooseWorker); 
	}

}
