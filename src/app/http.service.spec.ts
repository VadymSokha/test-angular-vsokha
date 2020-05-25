import { HttpClient } from '@angular/common/http';

jest.mock("@angular/common/http");

describe('HttpService', () => {

  let httpClient: HttpClient;
  let dataService: DataService;

  beforeEach(() => {
    httpClient = new HttpClient({} as any);
    jest.spyOn(httpClient, "get");
    jest.spyOn(httpClient, "post");
  });

  it('when getData is called it should', () => {
  });

  it('when postData is called it should', () => {
  });

  
});
