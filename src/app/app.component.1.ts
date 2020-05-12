import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService} from './http.service';
import { Worker} from './worker';
import { Project} from './project';
import { Prworker} from './prworker';
import { DataService } from './data.service';
// mat-table [dataSource]="myDataArray"
@Component({
    selector: 'worker-list',
    template: `	<table border="1" class="workersList" id="workersTable" mat-table>
					<thead class="workersHead">
					<tr mat-header-row>
					<th mat-header-row colspan="7">Список работников</th>
					</tr> 
					<tr>
                    <th mat-header-cell>№</th>
                    <th mat-header-cell>Фамилия</th>
                    <th mat-header-cell>Имя</th>
                    <th mat-header-cell>Отчество</th>
                    <th mat-header-cell>Возраст</th>
                    <th mat-header-cell>Пол</th>
                    <th mat-header-cell>Удалить</th>
					</tr>
					</thead>
					<tbody id="bodyWorkers">
					<tr *ngFor="let worker of workers" (click)="setMarker($event);">
                    <td class="center regnumber">{{worker?.regnum}}</td>
                    <td><input matInput="text" class="last" [(ngModel)]="worker.lastname"></td>
                    <td><input matInput="text" class="first" [(ngModel)]="worker.firstname"></td>
                    <td><input matInput class="second" [(ngModel)]="worker.secondname"></td>
                    <td class="center"><input matInput="number" class="age" [(ngModel)]="worker.age"></td>
					<td><select class="form-control sex" [(ngModel)]="worker.sex">
                            <option [value]="0">мужской</option>
                            <option [value]="1">женский</option>
                        </select></td>
					<td><button [value]="worker.regnum" class="normalHeight" (click)="delWorker($event);" 
						title="Для удаления работника">№ {{worker?.regnum}}
					</button></td>
					</tr>
					<tr>
                    <td class="regnumber">{{addWorker?.regnum}}</td>
					<td><input matInput="text" [(ngModel)]="addWorker.lastname" placeholder="Фамилия">
					</td>
                    <td><input matInput="text" class="first" [(ngModel)]="addWorker.firstname"/></td>
                    <td><input matInptu="text" class="second" type="text" [(ngModel)]="addWorker.secondname"/></td>
                    <td><input matInput="number" class="age" [(ngModel)]="addWorker.age"></td>
					<td><select class="form-control sex" [(ngModel)]="addWorker.sex">
                            <option [value]=0>мужской</option>
                            <option [value]=1>женский</option>
                        </select></td>
					</tr>
					</tbody> 
               </table>
	
				<button (click)="saveWorkers(workers,'workersList');" mat-raised-button color="primary">
					Сохранить изменения в списке работников</button>`,
    providers: [HttpService,DataService],
	styles: [`
			input {width: 100%;}
			button { width: 100%; }
			.workersList {
				width: 100%;
			}
			.age {
				text-align: center;
			}
			.workersHead {
				background: darkblue;
				color: white;
			}
			.center {
				text-align: center;
			}
			td, input, select {
				background: inherit;
			}
			.normalHeight {
				padding: 1px;
			}
			`]
})

export class App1Component implements OnInit { 
   
    workers: Worker[]=[];
	addWorker: Worker = {	"regnum": null,
							"lastname": "",
							"firstname": "",
							"secondname": "",
							"age": null,
							"sex": null};
	currentWorker: number;   
    prworkers: Prworker[]=[];

    error: any;

    constructor(private httpService: HttpService,private dataService: DataService){}
      
    ngOnInit(){
        this.httpService.getData('workersList').subscribe(data => this.workers=data["workersList"],
            error => {this.error = error.message; console.log(error);});
		this.dataService.initialProjectWorker();
    }

	saveWorkers(workers,suite){
		let newWorker = this.addWorker;
		if( newWorker.lastname != null && newWorker.lastname != "" ){
			let ind = workers.length;
			newWorker.regnum = workers[ind - 1].regnum + 1;
			workers[ind] = {};
			for (let key in newWorker) {
				workers[ind][key] = newWorker[key];
			};
			this.addWorker = {	"regnum": null,
								"lastname": "",
								"firstname": "",
								"secondname": "",
								"age": null,
								"sex": null
							 };
		};
		this.httpService.postData(workers,suite).subscribe(
                    (data: Worker) => {null},
                    error => console.log(error)
                );
	}

	setMarker(ev){
		var obj , rn , cn , td;
		if(ev.target.parentNode.tagName == "TR"){
			var obj = ev.target;
		} else {
			var obj = ev.target.parentNode.parentNode.firstChild;
		};
		rn = obj.innerHTML;
		var trs = document.getElementById("bodyWorkers").getElementsByTagName("tr");
		for(let i = 0;i < trs.length;i++){
			//trs[i].style.backgroundColor = "white";
			obj = trs[i].firstChild;
			cn = obj.innerHTML;
			if(cn == rn){
				//trs[i].style.backgroundColor = "#ffffe0";
				document.getElementById("crossTable").setAttribute("currentWorker",rn);
			};
		};
		let bt = document.getElementById("saveCross");
		bt.classList.remove("rowHide");
		let bt2 = document.getElementById("addCross");
		bt2.classList.remove("rowHide");
		//
		var bcross = document.getElementById("bodyCross");
		var rows = bcross.getElementsByTagName("tr");
		for(let k = 0;k < rows.length;k++){
			td = rows[k].lastChild.firstChild;
			if(td.title == rn){
				rows[k].className = "";
				rows[k].style.visibility = "visible";
			} else {
				rows[k].className = "rowHide";
				rows[k].style.visibility = "collapse";
			};
		};
		
	};

	delWorker(bt){
		this.currentWorker = bt.target.value;
		let k = this.dataService.findWorker(this.currentWorker);
		if(k >= 0){
			let dm = document.getElementById("bodyMessage");
			let dv = document.getElementById("frameMessage");
			dm.innerHTML = "Этот работник есть в команде проекта.<br>Как минимум, это проект № "+k+
				".<br>Удалить нельзя!";
			dv.style.visibility = "visible";
			return;
		};
		let elem;
		for(elem = 0;elem < this.workers.length;elem++){
			if(this.workers[elem].regnum == this.currentWorker){
				this.workers.splice(elem,1);
			};
		};
	}

}
