import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CreateRequestResponse {
  _id?: string;
  error?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  searchMode: 'street' | 'survey' = 'street';

  zone = '';
  sroName = '';
  village = '';
  streetName = '';
  surveyNumber = '';

  message = signal('');
  isSubmitting = signal(false);

  async submitSearch(): Promise<void> {
    this.message.set('');
    this.isSubmitting.set(true);

    const inputs = {
      zone: this.zone.trim(),
      sroName: this.sroName.trim(),
      village: this.village.trim(),
      ...(this.searchMode === 'street'
        ? { streetName: this.streetName.trim() }
        : { surveyNumber: this.surveyNumber.trim() }),
    };

    try {
      const response = await fetch(
        'http://localhost:3000/api/guideline-requests',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputs }),
        },
      );

      const data = (await response.json()) as CreateRequestResponse;

      if (!response.ok) {
        throw new Error(data.error ?? 'Could not save the request.');
      }

      this.message.set(`Request saved. ID: ${data._id ?? 'unknown'}`);
    } catch (error) {
      this.message.set(
        error instanceof Error
          ? error.message
          : 'Could not connect to the backend.',
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
