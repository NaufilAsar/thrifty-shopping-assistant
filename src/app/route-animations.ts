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
  transition(
    'One => One, One => Two, One => Three, One => Four, One => Five, One => Six, One => Seven,Two => Two, Two => Three, Two => Four, Two => Five, Two => Six, Two => Seven,Three=>Three, Three => Four, Three => Five, Three => Six, Three => Seven,Four=>Four, Four => Five, Four => Six, Four => Seven,Five=>Five, Five => Six, Five => Seven,Six=>Six, Six => Seven, Seven => Seven',
    [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '-100%' })]),
      query(':leave', animateChild()),
      group([
        query(':leave', [animate('150ms ease-out', style({ left: '100%' }))]),
        query(':enter', [animate('150ms ease-out', style({ left: '0%' }))]),
      ]),
    ]
  ),

  transition(
    'Seven => Seven,Seven => Six,Seven => Five,Seven => Four,Seven => Three,Seven => Two,Seven => One, Six => Six,Six => Five,Six => Four,Six => Three,Six => Two,Six => One, Five => Five,Five => Four,Five => Three,Five => Two,Five => One, Four => Four,Four => Three,Four => Two,Four => One, Three => Three,Three => Two,Three => One, Two => Two,Two => One, One => One',
    [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '-100%' })]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%', opacity: 0 })),
        ]),
        query(':enter', [animate('150ms ease-out', style({ left: '0%' }))]),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]
  ),
]);
