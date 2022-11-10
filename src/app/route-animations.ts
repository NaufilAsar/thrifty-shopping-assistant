import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    group([
      query(':leave', [animate(400, style({ opacity: 0 }))], {
        optional: true,
      }),
      query(
        ':enter',
        [style({ opacity: 0 }), animate(400, style({ opacity: 1 }))],
        { optional: true }
      ),
    ]),
  ]),
]);
