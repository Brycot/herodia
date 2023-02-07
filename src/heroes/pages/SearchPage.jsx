import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers/getHeroesByName';

export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const { onInputChange, searchText } = useForm({
        searchText: q,
    });

    const heroes = getHeroesByName(q);

    const onSearchSubmit = (event) => {
        event.preventDefault();
        // if (searchText.trim().length <= 1) return;

        navigate(`?q=${searchText.toLowerCase().trim()}`);
    };

    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <form
                        aria-label='form'
                        className="d-flex align-items-center"
                        onSubmit={onSearchSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Search a hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={onInputChange}
                        />

                        <button
                            type="submit"
                            className="btn btn-outline-primary mt-1"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {searchText.trim().length <= 0 && (
                        <div className="alert alert-primary animate__animated animate__fadeIn">
                            Search a hero
                        </div>
                    )}

                    {(heroes.length === 0 && searchText.trim().length > 1) && (
                        <div className="alert alert-danger animate__animated animate__fadeIn">
                            No hero with <b>{q}</b>
                        </div>
                    )}

                    {heroes &&
                        heroes.map((heroe) => (
                            <HeroCard key={heroe.id} {...heroe} />
                        ))}
                </div>
            </div>
        </>
    );
};
