import { HttpService } from './http.service';
import { App4Component } from './app.component.4';
import { autoSpy } from 'autoSpy';

describe('App4Component', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngOnInit();
    // assert
    expect(c).toEqual
  });

  it('when change is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.change(8);
    // assert
    expect(c).toEqual
  });

  
});

function setup() {
  const httpService = autoSpy(HttpService);
  const builder = {
    httpService,
    default() {
      return builder;
    },
    build() {
      return new App4Component(httpService);
    }
  };

  return builder;
}
