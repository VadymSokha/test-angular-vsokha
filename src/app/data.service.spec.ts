//import { DataService } from "./data.service";
//import { autoSpy } from "autoSpy";
import { HttpClient } from "@angular/common/http";

jest.mock("@angular/common/http");

describe("DataService", () => {

  let httpClient: HttpClient;
  let dataService: DataService;

  beforeEach(() => {
    httpClient = new HttpClient({} as any);
    jest.spyOn(httpClient, "get");

  });

  it("when addProjectWorker is called it should", () => {
  });

  it("when removeProjectWorker is called it should", () => {
  });

  it("when initialProjectWorker is called it should", () => {
  });

  it("when dataSize is called it should", () => {
  });

  it("when findWorker is called it should", () => {
  });

  it("when findProject is called it should", () => {
  });

  
});
