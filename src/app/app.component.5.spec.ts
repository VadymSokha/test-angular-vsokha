import { HttpService } from './http.service';
import { App5Component } from './app.component.5';
import { autoSpy } from 'autoSpy';

describe('App5Component', () => {
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
    c.change(7);
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
      return new App5Component(httpService);
    }
  };

  return builder;
}
