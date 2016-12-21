/**
 * Created by jiangyukun on 2016/10/20.
 */
import {merge} from 'lodash'

export function app(state = {}, action) {
    if (action.type == 'TOGGLE_ASIDE') {
        return merge({}, state, {settings: {asideFolded: !state.settings.asideFolded}})
    }
    if (action.type == 'TOGGLE_MESSAGE_PANEL') {
        return merge({}, state, {settings: {asideMessage: !state.settings.asideMessage}})
    }
    if (action.type == 'CLOSE_MESSAGE_PANEL') {
        return merge({}, state, {settings: {asideMessage: true}})
    }
    return state
}
