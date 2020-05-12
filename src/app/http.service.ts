import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class HttpService{
    
    constructor(private http: HttpClient){ }
      
    getData(suite){
		let ret = this.http.get(`http://127.0.0.1:8080/`+suite);
		return ret;
    }

	postData(body,suite){
		console.log("Отправка "+suite+": "+body);
		return this.http.post(`http://127.0.0.1:8080/`+suite, body); 		
	}
}