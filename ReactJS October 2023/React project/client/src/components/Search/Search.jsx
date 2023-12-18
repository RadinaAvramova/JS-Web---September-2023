import styles from './Search.module.css';
import * as sofaService from '../../services/sofaService';
import { useEffect, useState } from 'react';

import SofaCard from './SofaCard/SofaCard';

export default function Search() {


    const [latestSofas, setLatestSofas] = useState([]);
    const [sofas, setSofas] = useState([]);
    const [searchParam, setSearchParam] = useState({
        name: '',
    })

    useEffect(() => {
        sofaService.getLatestSofas()
            .then(result => setSofas(result))

    }, []);

    const onChange = (e) => {

        let { name, value, type } = e.target;
        setSearchParam(state => ({ ...state, [name]: type === 'number' ? Number(value) : value }));

    }

    const onSubmit = (e) => {

        e.preventDefault();
        onSearch();
    }

    const onSearch = () => {
        if (!searchParam.name || searchParam.name === '') {
            return;
        }

        let query;
        if (searchParam.name && searchParam.name !== '') {

            query = searchParam.name;
        }

        sofaService.search(query)
            .then(result => {

                setSofas(result);
                setLatestSofas([]);
            });

    }

    return (
        <section className={styles.search}>

            <section className={styles["search-form"]}>
                <form className="search" onSubmit={onSubmit}>
                    <input type="text" name="name" value={searchParam.name} onChange={onChange} placeholder="Search by name" />
                    <div>
                        <button type="submit">SEARCH</button>
                    </div>
                </form>
            </section>

            {latestSofas.length > 0 ?
                <div >
                    <h2>Latest sofas</h2>

                    <div id="search-container">
                        <ul className={styles["sofa-wrapper"]}>
                            {latestSofas.map(sofa => <SofaCard key={sofa._id} {...sofa} />)}
                            {!latestSofas.length && <h2>No sofas yet...</h2>}
                        </ul>
                    </div>
                </div>
                :
                <div className={styles["search-result"]}>
                    <h2>Results:</h2>

                    <div id="search-container">
                        <ul className={styles["sofa-wrapper"]}>
                            {sofas.map(sofa => <SofaCard key={sofa._id} {...sofa} />)}
                            {!sofas.length && <h2>There are no results found.</h2>}
                        </ul>
                    </div>

                </div>
            }
        </section>
    )
}