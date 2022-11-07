import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
} from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
  transition(
    'One => Two,One => Three,One => Four,One => Five,One => Six,One => Seven,Two => Three,Two => Four,Two => Five,Two => Six,Two => Seven,Three => Four,Three => Five,Three => Six,Three => Seven,Four => Five,Four => Six,Four => Seven,Five => Six,Five => Seven,Six => Seven',
    [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ right: '-100%', opacity: 0 })]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('400ms ease-out', style({ right: '100%', opacity: 0 })),
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ right: '0%', opacity: 1 })),
        ]),
      ]),
      query(':enter', animateChild()),
    ]
  ),
  transition('* => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('400ms ease-out', style({ left: '100%', opacity: 0 })),
      ]),
      query(':enter', [
        animate('400ms ease-out', style({ left: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
