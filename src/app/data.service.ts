import { Injectable , Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Prworker } from './prworker';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
 
export class DataService{
       
    public prwr: Prworker[]=[];
	relSize: any;
    error: any;

    constructor(private httpService: HttpService){}

    addProjectWorker(newCross: Prworker){
        this.prwr.splice(0,0,newCross);
    }

    removeProjectWorker(elem: number){
        this.prwr.splice(elem,1);
    }

	initialProjectWorker(){
        this.httpService.getData('crossList').subscribe(data => this.prwr=data["crossList"]);
	}

	ngOnInit(){
		this.initialProjectWorker();
	}

	dataSize(){
		this.relSize = this.prwr.length;
		return this.relSize;
	}

	findWorker(elem: number) {
		console.log("Ищем "+elem+" по "+this.prwr.length+"  елементам");
		for(let k = 0;k < this.prwr.length;k++){
			if(Number(this.prwr[k].worker) == elem){
				return this.prwr[k].project;
			};
		};
		return -1;
	}

	findProject(elem: number) {
		console.log("Ищем "+elem+" по "+this.prwr.length+"  елементам");
		for(let k = 0;k < this.prwr.length;k++){
			console.log(Number(this.prwr[k].project)+" vs "+elem);
			if(Number(this.prwr[k].project) == elem){
				return this.prwr[k].worker;
			};
		};
		return -1;
	}

}