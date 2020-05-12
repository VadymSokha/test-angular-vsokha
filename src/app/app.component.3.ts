import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService} from './http.service';
import { Worker} from './worker';
import { Project} from './project';
import { Prworker} from './prworker';

@Component({
    selector: 'table-cross',
    template: `	<table border="1" class="cross" id="crossTable" currentProject="" currentWorker="">
					<thead class="crossHead">
					<tr>
					<th colspan="2">Команда проекта</th>
					</tr>
					<tr>
                    <th width="50%">Проект</th>
                    <th width="50%">Ф И О</th>
					</tr>
					</thead>
					<tbody id="bodyCross">
					<tr *ngFor="let prworker of prworkers" class="">
					<td width="50%"><select-project [valueDef2]="prworker.project" 
						[title]="prworker.project" 
						class="workerInProject" (change)="onChange2($event);">
					</select-project></td>
                    <td width="50%"><select-worker [valueDef]="prworker.worker" 
						[title]="prworker.worker" 
						class="workerInProject" (change)="onChange($event);">
					</select-worker></td>
					</tr> 
					</tbody> 
               </table>
				<button id="saveCross" (click)="saveCross('crossList',prworkers);" 
						class="rowHide" mat-raised-button color="primary">Сохранить изменения
				</button>
				<button id="addCross" (click)="addWorkerCross(prworkers);" mat-raised-button color="primary" 
						class="rowHide" title="Предварительно следует выбрать проект">Добавить в команду
				</button>`,
    providers: [HttpService],
	styles: [`
			input {
				width: 100%;
			}
			.cross {
				width: 100%;
			}
			.crossHead {
				background: darkblue;
				color: white;
			}
			.center {
				text-align: center;
			}
			.rowHide {
				visibility: collapse;
			}
			.workerInProject {
				width: 100%;
			}
			`]
})


export class App3Component implements OnInit { 
   
    prworkers: Prworker[]=[];
    workers: Worker[]=[];
	addCross: Prworker = {
								"project": null ,
								"worker": null
							};
    error: any;

    constructor(private httpService: HttpService){}
      
    ngOnInit(){
        console.log("Запрос к серверу: работник в проекте");  
        this.httpService.getData('crossList').subscribe(data => this.prworkers=data["crossList"],
            error => {this.error = error.message; console.log(error);});
    }

	ngAfterViewChecked(){
		var rows = document.getElementById("bodyCross").getElementsByTagName("tr");
		let rn = document.getElementById("crossTable").getAttribute("currentProject");
		let rw = document.getElementById("crossTable").getAttribute("currentWorker");
		for(let k = 0;k < rows.length;k++){
			let td: any = rows[k].firstChild.firstChild;
			let wr: any = rows[k].lastChild.firstChild;
			if(td.title == rn || wr.title == rw){
				rows[k].className = "";
			} else {
				rows[k].className = "rowHide";
			};
		};
	}

	saveCross(suite,prworkers){
		let newPrworker = this.addCross;
		console.log(prworkers+"\n"+suite+" № работника = "+newPrworker.worker);
		if( newPrworker.worker > 0 ){
			let ind = prworkers.length;
			newPrworker.project = Number(document.getElementById("currentProject").innerHTML);
			prworkers[ind] = {};
			for (let key in newPrworker) {
				prworkers[ind][key] = newPrworker[key];
			};
			
			this.addCross = 	{	"project": newPrworker.project,
									"worker": 0
							 	};
		};
		this.httpService.postData(prworkers,suite).subscribe(
                    (data: Prworker) => {null},
                    error => console.log(error)
                );
		window.location.reload();  
	}

	addWorkerCross(prworkers){
		var td;
		let rn = document.getElementById("crossTable").getAttribute("currentProject");
		let newWorker: Prworker = 	{	"project" : null ,
										"worker" : null };
		newWorker.project = Number(rn);
		alert(rn);
		this.prworkers.splice(0, 0, newWorker);
		//
		var rows = document.getElementById("bodyCross").getElementsByTagName("tr");
		for(let k = 0;k < rows.length;k++){
			td = rows[k].firstChild;
			if(td.innerHTML == rn || k == 0){
				rows[k].className = "";
				rows[k].style.visibility = "visible";
			} else {
				rows[k].className = "rowHide";
				rows[k].style.visibility = "collapse";
			};
		};
	}

	onChange(obj: any){
		console.log("=onChange= "+obj.target.value);
		var sels = document.getElementsByTagName("SELECT-WORKER");
		//	Удалим пустые
		for(let k = 0;k < this.prworkers.length;k++){
			console.log("=onChange= Смотрим["+k+"]: " + this.prworkers[k].worker);
			if(sels[k] == obj.target.parentNode && obj.target.value == 0){
				let rem = this.prworkers.splice(k, 1);
				console.log("=onChange= Удаляем: "+rem);
			} else if(sels[k] == obj.target.parentNode && obj.target.value > 0){
				this.prworkers[k].worker = obj.target.value;
				console.log("=onChange= Меняем на = "+this.prworkers[k].worker);
			};
		}
	}
	

	onChange2(obj: any){
		console.log("=onChange= "+obj.target.value);
		var sels = document.getElementsByTagName("SELECT-PROJECT");
		//	Удалим пустые
		for(let k = 0;k < this.prworkers.length;k++){
			console.log("=onChange= Смотрим["+k+"]: " + this.prworkers[k].project);
			if(sels[k] == obj.target.parentNode && obj.target.value == 0){
				let rem = this.prworkers.splice(k, 1);
				console.log("=onChange= Удаляем: "+rem);
			} else if(sels[k] == obj.target.parentNode && obj.target.value > 0){
				this.prworkers[k].project = obj.target.value;
				console.log("=onChange= Меняем на = "+this.prworkers[k].project);
			};
		}
	}
	
}
