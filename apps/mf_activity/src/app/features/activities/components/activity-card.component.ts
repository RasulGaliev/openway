import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Activity } from 'shared-models';
import { IconComponent } from 'shared-ui';

@Component({
  selector: 'app-activity-card',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.scss',
})
export class ActivityCardComponent {
  public readonly activity = input.required<Activity>();
}
