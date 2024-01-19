import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
    provideRouter(routes),
    importProvidersFrom(PrimeNGConfig),
    BrowserModule,
    BrowserAnimationsModule,
    provideAnimations(),
    provideAnimations()
],
};
