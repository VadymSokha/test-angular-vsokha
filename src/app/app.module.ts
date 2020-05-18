import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { App1Component }  from './app.component.1';
import { App2Component }  from './app.component.2';
import { App3Component }  from './app.component.3';
import { App4Component }  from './app.component.4';
import { App5Component }  from './app.component.5';
import { DataService }  from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

//, MatSort
@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, 
					BrowserAnimationsModule, LayoutModule, 
					MatToolbarModule, MatButtonModule, MatSidenavModule, 
					MatIconModule, MatListModule, MatSliderModule ,
					MatTableModule ] ,
    declarations: [ AppComponent, App1Component, App2Component, App3Component, App4Component, 
					App5Component ],
	providers:    [],
    bootstrap:    [ AppComponent, App1Component, App2Component, App3Component, App4Component, App5Component ]
})
export class AppModule {
						} 
