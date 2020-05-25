import { DataService } from "./data.service";
//import { autoSpy } from "autoSpy";
import { HttpClient } from "@angular/common/http";
import { HttpService } from './http.service';

jest.mock("@angular/common/http");

describe("DataService", () => {

  let httpClient: HttpClient;
  let dataService: DataService;

  beforeEach(() => {
    httpClient = new HttpClient({} as any);
	dataService = new DataService();
    jest.spyOn(httpClient, "get");

  });
  it("Сервис создан", () => {
    expect(dataService).toBeTruthy();
  });

  it("when addProjectWorker is called it should", () => {
  });

  it("when removeProjectWorker is called it should", () => {
  });

  it("when initialProjectWorker is called it should", () => {
  });

  it("when dataSize is called it should", () => {
	//dataService.initialProjectWorker();
	let count = dataService.dataSize();
	console.log(count);
	expect(count).toBe(7,"Связей должно быть 7");
  });

  it("when findWorker is called it should", () => {
  });

  it("when findProject is called it should", () => {
  });

  
});
