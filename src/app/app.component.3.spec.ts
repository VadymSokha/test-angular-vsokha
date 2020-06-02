import { HttpService } from './http.service';
import { App3Component } from './app.component.3';
import { Prworker} from './prworker';
import { autoSpy } from 'autoSpy';

describe('App3Component', () => {

  it('when onChange is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.onChange(Event);
    // assert
    expect(c).toEqual
  });

  it('when onChange2 is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.onChange2(Event);
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
      return new App3Component(httpService);
    }
  };

  return builder;
}
