import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService} from './http.service';
import { Worker} from './worker';
import { Project} from './project';
import { Prworker} from './prworker';
import { DataService } from './data.service';

@Component({
    selector: 'table-projects',
    template: `	<table border="1" class="projectsList" id="projectsTable">
					<thead class="projectsHead">
					<tr>
					<th colspan="3">Список проектов</th>
					</tr>
					<tr>
                    <th>№</th>
                    <th>Название проекта</th>
                    <th>Удалить</th>
					</tr>
					</thead> 
					<tbody id="bodyProjects">
					<tr *ngFor="let project of projects" (click)="setMarker($event);">
                    <td class="regnum center">{{project.regnum}}</td>
                    <td><input class="nameProject" type="text" [(ngModel)]="project.nameProject"></td>
					<td><button [value]="project.regnum" (click)="delProject($event);"
						title="Для удаления проекта">№ {{project?.regnum}}</button></td>
					</tr>
					<tr nohide="yes">
                    <td class="regnumber center">{{addProject?.regnum}}</td>
                    <td><input class="nameProject" type="text" [(ngModel)]="addProject.nameProject"/></td>
					</tr>
					</tbody> 
               </table>
				<button (click)="saveProjects(projects,'projectsList');" mat-raised-button color=primary>
					Сохранить изменения в списке проектов</button>`,
    providers: [HttpService,DataService],
	styles: [`
			input, button {width: 100%;}
			.projectsList {
				width: 100%;
			}
			.projectsHead {
				background: darkblue;
				color: white;
			}
			.center {
				text-align: center;
			}
			td, input, select {
				background: inherit;
			}
			`]
})


export class App2Component implements OnInit { 
   
	prName = "";
	currentProject: number = 0;
    projects: Project[]=[];
	addProject: Project =	{
							"regnum": null ,
							"nameProject": "" 
							};
    error: any;

    constructor(private httpService: HttpService,private dataService: DataService){}
      
    ngOnInit(){
        this.httpService.getData('projectList').subscribe(data => this.projects=data["projectList"],
            error => {this.error = error.message; console.log(error);});
		this.dataService.initialProjectWorker();
    }

	saveProjects(projects,suite){
		console.log(projects+"\n"+suite);
		let newProject = this.addProject;
		if( newProject.nameProject !== null && newProject.nameProject !== "" ){
			let ind = projects.length;
			newProject.regnum = projects[ind - 1].regnum + 1;
			projects[ind] = {};
			for (let key in newProject) {
				projects[ind][key] = newProject[key];
			};
			this.addProject = {	"regnum": null,
								"nameProject": ""
							 };
		};
		this.httpService.postData(projects,suite).subscribe(
                    (data: Project) => {null},
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
		var trs = document.getElementById("bodyProjects").getElementsByTagName("tr");
		for(let i = 0;i < trs.length;i++){
			//trs[i].style.backgroundColor = "white";
			obj = trs[i].firstChild;
			cn = obj.innerHTML;
			if(cn == rn){
				//trs[i].style.backgroundColor = "#ffffe0";
				document.getElementById("crossTable").setAttribute("currentProject",rn);
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
			td = rows[k].firstChild.firstChild;
			if(td.title == rn){
				rows[k].className = "";
				rows[k].style.visibility = "visible";
			} else {
				rows[k].className = "rowHide";
				rows[k].style.visibility = "collapse";
			};
		};
		
	};

	delProject(bt){
		this.currentProject = bt.target.value;
		let k = this.dataService.findProject(this.currentProject);
		if(k >= 0){
			let dm = document.getElementById("bodyMessage");
			let dv = document.getElementById("frameMessage");
			console.log(dm+" --> "+dv);
			dm.innerHTML = "Команда проекта не пуста.<br>Как минимум, в ней работник № "+k+".<br>Удалить нельзя!";
			dv.style.visibility = "visible";
			return;
		};
		let elem;
		for(elem = 0;elem < this.projects.length;elem++){
			if(this.projects[elem].regnum == this.currentProject){
				//alert("№ в массиве = "+elem);
				this.projects.splice(elem,1);
			};
		};
	}

}
