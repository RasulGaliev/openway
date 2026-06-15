import { Component } from '@angular/core';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome],
  selector: 'app-mf_activity-entry',
  template: `<app-nx-welcome></app-nx-welcome>`,
})
export class RemoteEntry {}
