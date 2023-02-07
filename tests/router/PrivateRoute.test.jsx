import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en <PrivateRoute />', () => {
    test('debe de mostrar el children si esta autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Bryan',
            },
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <PrivateRoute>
                        <h1>Marvel</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Marvel')).toBeTruthy();
    });

    test('debe de navegar si no esta autenticado', () => {
        const contextValue = {
            logged: false,
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Routes>
                        <Route
                            path="marvel"
                            element={
                                <PrivateRoute>
                                    <h1>Pagina Marvel</h1>
                                </PrivateRoute>
                            }
                        />
                        <Route path="login" element={<h1>Ruta Publica</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Ruta Publica')).toBeTruthy();
    });

    test('debe de guardar la ultima ruta', () => {
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Bryan',
            },
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                        <h1>Marvel</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
    });
});
