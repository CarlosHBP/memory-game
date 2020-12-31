import { select, put, takeEvery, delay } from "redux-saga/effects";

import {
    SELECT_CARD,
    LOCK,
    OPEN_CARD,
    SET_MATCH,
    CLOSE_CARD,
    START_GAME,
    CLOSE_ALL_CARDS,
    RESTART_GAME,
} from "./actions";

function* selectCard(action) {
    const { key } = action;
    const cards = yield select((state) => state.cards);
    const isLocked = yield select((state) => state.isLocked);
    const index = cards.findIndex((c) => c.key === key);
    const otherCardindex = cards.findIndex((c) => c.isActive && !c.hasMatch);

    if (!isLocked && index > -1 && !cards[index].isActive) {
        yield put({ type: OPEN_CARD, index });

        if (otherCardindex > -1) {
            if (cards[index].id === cards[otherCardindex].id) {
                yield put({
                    type: SET_MATCH,
                    index1: index,
                    index2: otherCardindex,
                });
            } else {
                yield put({ type: LOCK });
                yield delay(1500);
                yield put({
                    type: CLOSE_CARD,
                    index1: index,
                    index2: otherCardindex,
                });
            }
        }
    }
}

function* closeCards() {
    yield put({ type: CLOSE_ALL_CARDS });
    yield delay(700);
    yield put({
        type: RESTART_GAME,
    });
}

function* gameSaga() {
    yield takeEvery(SELECT_CARD, selectCard);
    yield takeEvery(START_GAME, closeCards);
}

export default gameSaga;
