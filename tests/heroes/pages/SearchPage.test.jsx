const { render, screen, fireEvent } = require('@testing-library/react');
const { MemoryRouter, useNavigate } = require('react-router-dom');
const { SearchPage } = require('../../../src/heroes/pages/SearchPage');

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <SearchPage />', () => {
    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrarse correctamente con valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
    });

    test('Debe de mostrar un error si no se encuentra el hero', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=carlitos']}>
                <SearchPage />
            </MemoryRouter>
        );
        expect(screen.getByText('No hero with')).toBeTruthy();
    });

    test('Debe de llamar el navigate a la pantalla nueva', () => {
        const inputValue = 'superman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {
            target: { name: 'searchText', value: inputValue },
        });
        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
    });
});
