import { authReducer, types } from '../../../src/auth';

describe('Pruebas en authReducer', () => {
    const initialState = { logged: false };
    test('debe de retornar el estado por defecto', () => {
        const state = authReducer(initialState, {});

        expect(state).toEqual(initialState);
    });
    test('debe de llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                id: 'abc',
                name: 'Bryan',
            },
        };
        const state = authReducer(initialState, action);
        expect(state.user).toEqual(action.payload);
    });
    test('debe de boorar el name del usuario y logged en false', () => {
        const sate = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Bryan',
            },
        };

        const actionOut = {
            type: types.logout,
        };

        const newState = authReducer(sate, actionOut);
        expect(newState).toEqual(initialState);
    });
});
