import { CHANGE_LOCALE } from '../actions';
import frMessages from '../messages/fr';

const defaultState = {
    locale: 'fr',
    messages: frMessages
};

export default function( state = defaultState, action ) {
    if ( action.type == CHANGE_LOCALE ) {
        return {
            locale: action.locale,
            messages: action.messages
        }
    }
    return state;
}