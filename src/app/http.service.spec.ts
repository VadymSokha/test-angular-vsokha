import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

jest.mock("@angular/common/http");

describe('HttpService', () => {

  let httpClient: HttpClient;
  let httpService: HttpService;
  let ret;

  beforeEach(() => {
    httpClient = new HttpClient({} as any);
    jest.spyOn(httpClient, "get");
    jest.spyOn(httpClient, "post");
  });

  it('when getData is called it should', () => {
	ret = httpService.getData("workersList");
  });

  it('when postData is called it should', () => {
  });

  
});
