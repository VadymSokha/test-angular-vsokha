import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService} from './http.service';
import { Worker} from './worker';
import { Project} from './project';
import { Prworker} from './prworker';
import { DataService } from './data.service';
import {Sort} from '@angular/material/sort';


 
@Component({
    selector: 'worker-list',
    template: `	<table matSort (matSortChange)="sortData($event)"> 
					<tr>
						<th mat-header-row colspan="7">Список работников</th>
					</tr>

					<tr>
                    	<th mat-sort-header="regnum">№</th>
                    	<th mat-sort-header="lastname">Фамилия</th>
                    	<th mat-sort-header="firstname">Имя</th>
                    	<th mat-sort-header="secondname">Отчество</th>
                    	<th mat-sort-header="age">Возраст</th>
                    	<th mat-sort-header="sex">Пол</th>
                    	<th mat-sort-header="del">Удалить</th>
					</tr>
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
			.mat-sort-header-container {
				align-items: center;
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
	sortedData: Worker[];

    constructor(private httpService: HttpService,private dataService: DataService){
		//this.sortedData = this.workers.slice();
	}
      
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

	sortData(sort: Sort) {
    	const data = this.workers.slice();
    	if (!sort.active || sort.direction === '') {
      		this.sortedData = data;
      		return;
    	}

    	this.sortedData = data.sort((a, b) => {
      		const isAsc = sort.direction === 'asc';
      		switch (sort.active) {
        		case 'regnum': return this.compare(a.regnum, b.regnum, isAsc);
        		case 'firstname': return this.compare(a.firstname, b.firstname, isAsc);
        		case 'lastname': return this.compare(a.lastname, b.lastname, isAsc);
        		case 'secondname': return this.compare(a.secondname, b.secondname, isAsc);
        		case 'age': return this.compare(a.age, b.age, isAsc);
        		case 'sex': return this.compare(a.sex, b.sex, isAsc);
        		default: return 0;
      		}
    	});
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


	compare(a: number | string, b: number | string, isAsc: boolean) {
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}


}
