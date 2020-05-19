import { Component, OnInit, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Worker } from './worker';
import { Project } from './project';
import { Prworker } from './prworker';
import { DataService } from './data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule }   from '@angular/forms';

@Component({
    selector: 'worker-list', 
    template: `	<div class="workersHead age input">Список работников</div>	
				<table mat-table id="tableWorker" [dataSource]="workers" class="mat-elevation-z8">
					<ng-container matColumnDef="regnum">
						<th mat-header-cell *matHeaderCellDef class="center"> № </th>
						<td mat-cell *matCellDef="let element" workerID="element.regnum">{{element.regnum}}</td>
					</ng-container>
					<ng-container matColumnDef="lastname">
						<th mat-header-cell *matHeaderCellDef class="center">Фамилия</th>
						<td mat-cell *matCellDef="let element" workerID="element.regnum">
							<input matInput="text" [(ngModel)]="element.lastname" placeholder="Фамилия">
						</td>
					</ng-container> 
					<ng-container matColumnDef="firstname">
						<th mat-header-cell *matHeaderCellDef class="center">Имя</th>
						<td mat-cell *matCellDef="let element" workerID="element.regnum">
							<input matInput="text" class="first" [(ngModel)]="element.firstname">
						</td>
					</ng-container> 
					<ng-container matColumnDef="secondname">
						<th mat-header-cell *matHeaderCellDef class="center">Отчество</th>
						<td mat-cell *matCellDef="let element" workerID="element.regnum">
							<input matInput class="second" [(ngModel)]="element.secondname">
						</td>
					</ng-container> 
					<ng-container matColumnDef="age">
						<th mat-header-cell *matHeaderCellDef class="center">Возраст</th>
						<td mat-cell *matCellDef="let element" workerID="element.regnum">
							<input matInput="number" class="age" [(ngModel)]="element.age">
						</td>
					</ng-container> 
					<ng-container matColumnDef="sex">
						<th mat-header-cell *matHeaderCellDef class="center">Пол</th>
						<td mat-cell *matCellDef="let element" workerID="element.regnum">
							<select class="form-control sex" [(ngModel)]="element.sex">
                            	<option [value]="0">мужской</option>
                            	<option [value]="1">женский</option>
                        	</select>
						</td>
					</ng-container> 
					<ng-container matColumnDef="del">
						<th mat-header-cell *matHeaderCellDef class="center">Удалить</th>
						<td mat-cell *matCellDef="let element" workerID="element.regnum">
							<button [value]="element.regnum" class="normalHeight" (click)="delWorker($event);" 
								title="Для удаления работника">№ {{element?.regnum}}</button>
						</td>
					</ng-container> 

					<tr mat-header-row *matHeaderRowDef="workerColumns"></tr>
					<tr mat-row *matRowDef="let row; columns: workerColumns;" 
						(click)="setMarker($event);"></tr>
                    
				</table>

				<table>
					<tr nohide="yes">
                    <td class="regnumber center newinput">?</td>
                    <td>
						<input class="newinput"  matInput="text"
							[(ngModel)]="addWorker.lastname" placeholder="Фамилия">
					</td>
                    <td>
						<input class="newinput"  matInput="text" [(ngModel)]="addWorker.firstname" 
							placeholder="Имя">
					</td>
                    <td>
						<input class="newinput"  matInput="text" [(ngModel)]="addWorker.secondname" 
							placeholder="Отчество">
					</td>
					<td>
						<input  matInput="number" class="age newinput" [(ngModel)]="addWorker.age" 
							placeholder="Возраст">
					</td>
					<td>
							<select class="form-control sex newinput" [(ngModel)]="addWorker.sex" 
								placeholder="Пол">
                            	<option [value]="0">мужской</option>
                            	<option [value]="1">женский</option>
							</select>
					</td>
					<td>Новый</td>
					</tr>
				</table>
	
				<button (click)="saveWorkers(workers,'workersList');" mat-raised-button color="primary">
					Сохранить изменения в списке работников</button>
			`,
    providers: [HttpService,DataService],
	styles: [`
			input, select {
				background: inherit;
				width: 100%;
				height: 100%;
				color: yellow;
				border: 0px;
				margin: 0px;
				paddin: 0px;
			}
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
			.normalHeight {
				padding: 1px;
			}
			.mat-sort-header-container {
				align-items: center;
			}
			.newinput {
				background: white;
				color: black;
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

	workerColumns: string[] = ['regnum', 'lastname', 'firstname', 'secondname','age','sex','del'];
	dataSource;

    error: any;

    constructor(private httpService: HttpService,private dataService: DataService){
	};
      
    ngOnInit(){
		console.log("Запрос на список работников");
        this.httpService.getData('workersList').subscribe(data => this.workers=data["workersList"],
            error => {this.error = error.message; console.log(error);});
		this.dataService.initialProjectWorker();
    };

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
		console.log("Перечитаем список работников");
        this.httpService.getData('workersList').subscribe(data => this.workers=data["workersList"],
            error => {this.error = error.message; console.log(error);});
		this.dataService.initialProjectWorker();
	}

	setMarker(ev){
		var obj , rn , cn , td;
		console.log(ev.target.parentNode.tagName);
		if(ev.target.parentNode.tagName == "TR"){
			obj = ev.target;
		} else {
			let up2 = ev.target.parentNode.parentNode
			obj = up2.firstElementChild;
			console.log(obj.tagName+"\nparent = "+up2.tagName);
		};
		rn = obj.innerHTML;
		let bt = document.getElementById("saveCross");
		bt.classList.remove("rowHide");
		let bt2 = document.getElementById("addCross");
		bt2.classList.remove("rowHide");
		//
		var bcross = document.getElementById("bodyCross");
		var rows = bcross.getElementsByTagName("tr");
		for(let k = 0;k < rows.length;k++){
			td = rows[k].lastChild.firstChild;
			console.log(rn+" vs "+td.title);
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
		console.log("Удаляем работника № "+this.currentWorker);
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
			console.log(this.workers[elem].regnum+" vs "+this.currentWorker);
			if(this.workers[elem].regnum == this.currentWorker){
				console.log("Удаляем");
				this.workers.splice(elem,1);
				bt.target.parentNode.parentNode.style.display='none';
			};
		};
	}

}
