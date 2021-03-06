import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { autoSpy } from 'autoSpy';

describe('HttpService', () => {
  it('getData работает', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.getData("projectList");
    // assert
     expect(c).toEqual
  });

  it('postData работает', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.postData("UNIT-test","projectList");
    // assert
     expect(c).toEqual
  });

  
});

function setup() {
  const http = autoSpy(HttpClient);
  const builder = {
    http,
    default() {
      return builder;
    },
    build() {
      return new HttpService(http);
    }
  };

  return builder;
}
