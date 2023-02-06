import { useMemo } from 'react';
import { getHeroesByPublisher } from '../helpers';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {heroes.map((heroe) => (
                // <li key={heroe.id}>{heroe.superhero}</li>
                <HeroCard key={heroe.id} {...heroe} />
            ))}
        </div>
    );
};
