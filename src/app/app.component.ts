import { Component, OnInit , EventEmitter, Input, Output , Inject} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService} from './http.service';
import { DataService } from './data.service';
import { Prworker} from './prworker';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'reexample2',
    template: `

    		<mat-nav-list>
				<button id="refresh" mat-raised-button color="primary" (click)="refresh();">Обновить</button>
				<button id="allRelations" mat-raised-button color="primary"
					(click)="showAllRelations(1);">Показать все связи</button>
				<button id="hideRelations" mat-raised-button color="primary"
					(click)="showAllRelations(0);">Скрыть все связи и выбор</button>
				<button id="help" mat-raised-button color="primary">Подсказка</button>
				<button id="about" mat-raised-button color="primary" 
					(click)="openAbout($event);">О программе</button>
    		</mat-nav-list>

<dialog id="aboutShow" class="example-box" cdkDrag>
	<h2>Тестовая программа. Версия 1.0</h2>
	<button (click)="closeDialog($event);" mat-raised-button color="primary" class="styleMessage">OK</button>
</dialog>

				<table border="0" class="base" id="baseTable"> 
					<tbody> 
					<tr>
                    <td><worker-list>...</worker-list></td>
                    <td><table-projects>...</table-projects></td>
					</tr> 
					<tr>
                    <td colspan="2"><table-cross>..</table-cross></td>
					</tr> 
					</tbody> 
               </table>
				<div id="frameMessage" class="shadowMessage">
				<div id="headerMessage" class="headMessage">Сообщение</div>
				<div id="bodyMessage" class="styleMessage"></div>
				<button align="center" (click)="hideMessage();">OK</button>
				</div>`,
    providers: [HttpService,DataService],
	styles: [`
			.base {
				width: 100%;
			}
			td {
				width: 50%;
				vertical-align: top;
			}
			.shadowMessage {
				position: absolute;
				top: 100px;
				left: 200px;
				visibility: collapse;
				z-index: 3;
				background: #e0e0ff; /* Цвет фона */
				box-shadow: 6px 6px 16px 12px rgba(16,32,16,0.7); /* Параметры тени */
				padding: 10px;
				text-align: center;
			}
			.styleMessage {
				text-align: center;
			}
			.headMessage {
				color: white;
				background: darkblue;
				width: 100%;
				text-align: center;
			}
			.example-fill-remaining-space {
  				flex: 1 1 auto;
			}
			`]
})

export class AppComponent implements OnInit {

    public prwr: Prworker[]=[];
    error: any;

    constructor(private httpService: HttpService){}  

    ngOnInit(){
        console.log("Грузимся!");  
    }

    hideMessage(){
		let frm = document.getElementById('frameMessage');
		console.log(frm);
		frm.style.visibility = 'collapse';
	}

	refresh(){
		window.location.reload();
	}

	showAllRelations(n){
		var bcross = document.getElementById("bodyCross");
		var rows = bcross.getElementsByTagName("tr");
		console.log(rows.length);
		for(let k = 0;k < rows.length;k++){
			if(n == 1){
				rows[k].classList.remove("rowHide");
				rows[k].style.visibility = "visible";
			} else if(n == 0){
				rows[k].classList.add("rowHide");
				rows[k].style.visibility = "collapse";
			};
		}
	}

	closeDialog(ev){
		document.getElementById("aboutShow").style.display = "none";
	}

	openAbout(ev){
		document.getElementById("aboutShow").style.display = "block";
	}

}
