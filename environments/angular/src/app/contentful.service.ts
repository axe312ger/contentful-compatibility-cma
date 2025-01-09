import { Injectable } from '@angular/core';
import { createClient } from 'contentful-management';
import { environment } from '../environments/environment';

const CONFIG = {
  accessToken: environment.CMA_ACCESS_TOKEN,
};
  @Injectable()
  export class ContentfulService {
    private cmaClient = createClient({
      accessToken: CONFIG.accessToken,
    });

    constructor() {}

    getCurrentUser(): Promise<string> {
      return this.cmaClient
        .getCurrentUser()
        .then(() => '✅ Success!')
        .catch((err) => `🚫 Error: ${err.message}`);
    }
  }
