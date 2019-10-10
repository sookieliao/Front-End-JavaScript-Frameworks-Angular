import { trigger, state, style, animate, transition } from '@angular/animations';

export function visibility() {
    return trigger('visibility',[
        state('shown',style({
          transform: 'scale(1.0)',
          opacity: 1
        })), 
        state('hidden', style({
          transform: 'scale(0.5)',
          opacity: 0
        })),
        // from whichever state to whichever state, I want the animation 
        // for transition to be 0.5 secons, easy-in-easy-out.
        transition('* => *', animate('0.5s ease-in-out'))
      ])
}


