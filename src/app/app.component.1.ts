import { Component, OnInit, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Worker } from './worker';
import { Project } from './project';
import { Prworker } from './prworker';
import { DataService } from './data.service';
//import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'worker-list', 
    template: `	<div class="workersHead age input">Список работников</div>
				<table mat-table #table [dataSource]="dataSource" class="mat-elevation-z8"> 
					
					<ng-container matColumnDef="regnm">
						<th mat-header-cell *matHeaderCellDef mat-sort-header> № </th>
						<td mat-cell *matCellDef="let worker">{{worker.regnum}}</td>
					</ng-container>
					<ng-container matColumnDef="lastname">
						<th mat-header-cell *matHeaderCellDef mat-sort-header>Фамилия</th>
						<td mat-cell *matCellDef="let worker">
							<input matInput="text" [(ngModel)]="worker.lastname" placeholder="Фамилия">
						</td>
					</ng-container> 
					<ng-container matColumnDef="firstname">
						<th mat-header-cell *matHeaderCellDef mat-sort-header>Имя</th>
						<td mat-cell *matCellDef="let worker">
							<input matInput="text" class="first" [(ngModel)]="worker.firstname">
						</td>
					</ng-container> 
					<ng-container matColumnDef="secondname">
						<th mat-header-cell *matHeaderCellDef mat-sort-header>Отчество</th>
						<td mat-cell *matCellDef="let worker">
							<input matInput class="second" [(ngModel)]="worker.secondname">
						</td>
					</ng-container> 
					<ng-container matColumnDef="age">
						<th mat-header-cell *matHeaderCellDef mat-sort-header>Отчество</th>
						<td mat-cell *matCellDef="let worker">
							<input matInput="number" class="age" [(ngModel)]="worker.age">
						</td>
					</ng-container> 
					<ng-container matColumnDef="sex">
						<th mat-header-cell *matHeaderCellDef mat-sort-header>Отчество</th>
						<td mat-cell *matCellDef="let worker">
							<select class="form-control sex" [(ngModel)]="worker.sex">
                            	<option [value]="0">мужской</option>
                            	<option [value]="1">женский</option>
                        	</select>
						</td>
					</ng-container> 
					<ng-container matColumnDef="del">
						<th mat-header-cell *matHeaderCellDef mat-sort-header>Отчество</th>
						<td mat-cell *matCellDef="let worker">
							<button [value]="worker.regnum" class="normalHeight" (click)="delWorker($event);" 
								title="Для удаления работника">№ {{worker?.regnum}}</button>
						</td>
					</ng-container> 

					<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
					<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

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

	displayedColumns: string[] = ['regnum', 'lastname', 'firstname', 'secondname','age','sex','del'];
	dataSource;

    error: any;

    constructor(private httpService: HttpService,private dataService: DataService){
	}

	//@ViewChild(MatSort, {static: true}) sort: MatSort;

	
      
    ngOnInit(){
        this.httpService.getData('workersList').subscribe(data => this.workers=data["workersList"],
            error => {this.error = error.message; console.log(error);});
		this.dataService.initialProjectWorker();
		this.dataSource = new MatTableDataSource(this.workers);
		//this.dataSource.sort = this.sort;
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
