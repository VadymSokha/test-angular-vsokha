import { DataService } from "./data.service";
import { HttpService } from "./http.service";
//import { autoSpy } from "autoSpy";
import { HttpClient } from "@angular/common/http";

jest.mock("@angular/common/http");

describe("DataService", () => {

  let httpClient: HttpClient;
  let httpService: HttpService;
  let dataService: DataService;

  beforeEach(() => {
    httpClient = new HttpClient({} as any);
	httpService = new HttpService(httpClient);
	dataService = new DataService(httpService);
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
	dataService.ngOnInit();
	let count = dataService.dataSize();
	console.log(count);
	expect(count).toBe(0);
  });

  it("when findWorker is called it should", () => {
  });

  it("when findProject is called it should", () => {
  });

  
});
