import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { createClient } from 'contentful-management';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  result: string = "Loading...";
  title = 'angular';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const accessToken = environment.CMA_ACCESS_TOKEN;

      // Test 1: Plain Client API (new default)
      const plainClient = createClient({ accessToken });

      // Test 2: Legacy Client API
      const legacyClient = createClient({ accessToken }, { type: 'legacy' });

      // Test both APIs
      Promise.all([
        plainClient.user.getCurrent(),
        legacyClient.getCurrentUser()
      ])
        .then(() => {
          this.result = '✅ Success! (Plain + Legacy APIs)';
        })
        .catch((err: Error) => {
          this.result = `🚫 Error: ${err.message}`;
        });
    }
  }
}
