import {
    LOCK,
    OPEN_CARD,
    SET_MATCH,
    CLOSE_CARD,
    CLOSE_VICTORY_DIALOG,
    //START_GAME,
    RESTART_GAME,
    CLOSE_ALL_CARDS,
} from "./actions";
import ListBuilder from "../builders/ListBuilders";

const initialState = {
    isLocked: false,
    isVictoryDialogOpen: false,
    cards: new ListBuilder().createList(3).shuffle().build(),
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESTART_GAME: {
            return {
                ...state, //Propriedades não alteradas
                isVictoryDialogOpen: false,
                isLocked: false,
                cards: new ListBuilder().createList(3).shuffle().build(),
            };
        }

        case CLOSE_VICTORY_DIALOG: {
            return {
                ...state, //Propriedades não alteradas
                isVictoryDialogOpen: false,
            };
        }

        case LOCK: {
            return {
                ...state, //Propriedades não alteradas
                isLocked: true,
            };
        }

        case OPEN_CARD: {
            const cards = state.cards.slice();

            cards[action.index].isActive = true;

            return {
                ...state, //Propriedades não alteradas
                cards,
            };
        }

        case SET_MATCH: {
            const cards = state.cards.slice();
            let isVictoryDialogOpen = false;
            let isLocked = false;

            cards[action.index1].hasMatch = true;
            cards[action.index2].hasMatch = true;

            if (cards.every((c) => c.hasMatch)) {
                isVictoryDialogOpen = true;
                isLocked = true;
            }

            return {
                ...state, //Propriedades não alteradas
                isVictoryDialogOpen,
                isLocked,
                cards,
            };
        }

        case CLOSE_CARD: {
            const cards = state.cards.slice();

            cards[action.index1].isActive = false;
            cards[action.index2].isActive = false;

            return {
                ...state, //Propriedades não alteradas
                isLocked: false,
                cards,
            };
        }

        case CLOSE_ALL_CARDS: {
            const cards = state.cards.slice();

            //Fechar todas as cartas
            cards.map((card) => {
                card.isActive = false;
                return card;
            });

            return {
                ...state, //Propriedades não alteradas
                cards,
            };
        }

        // case "SELECT_CARD": {
        //     const cards = state.cards.slice();
        //     const index = cards.findIndex((c) => c.key === action.key);
        //     const otherCardindex = cards.findIndex(
        //         (c) => c.isActive && !c.hasMatch
        //     );

        //     if (index > -1) {
        //         if (cards[index].isActive) return state;

        //         if (otherCardindex > -1) {
        //             if (cards[index].id === cards[otherCardindex].id) {
        //                 cards[index].isActive = true;
        //                 cards[index].hasMatch = true;
        //                 cards[otherCardindex].hasMatch = true;
        //             } else {
        //                 cards[otherCardindex].isActive = false;
        //             }
        //         } else {
        //             cards[index].isActive = true;
        //         }
        //     }

        //     return {
        //         ...state, //Propriedades não alteradas
        //         cards,
        //     };
        // }

        default:
            return state;
    }
};

export default gameReducer;
