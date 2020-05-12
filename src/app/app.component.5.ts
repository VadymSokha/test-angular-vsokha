import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService} from './http.service';
import { Project} from './project';

@Component({
    selector: 'select-project',
    template: `	<select [(ngModel)]="valueDef2" (ngModelChange)="change(valueDef2);">
				<option [value]=0>&nbsp;&nbsp;---&nbsp;исключить---</option>
				<option *ngFor="let project of projects" class="wSelect" [value]="project.regnum">
					[{{project.regnum}}]&nbsp;{{project.nameProject}}
				</option></select>`,
    providers: [HttpService] ,
	styles: [`
			select {
				 width: 100%;
			}
			`]
})


export class App5Component implements OnInit { 
   
    projects: Project[]=[];
    error: any;
	@Input() valueDef2: number;
    

    constructor(private httpService: HttpService){}
      
    ngOnInit(){
        this.httpService.getData('projectList').subscribe(data => this.projects=data["projectList"],
            error => {this.error = error.message; console.log(error);});  
    }
    
	@Output() onChange2 = new EventEmitter<number>();
	
	change(chooseProject: number){;
		console.log(this.valueDef2+" <-- "+chooseProject);
		this.valueDef2 = chooseProject;
		this.onChange2.emit(chooseProject); 
	}

}
