import styles from './Catalog.module.css';
import { useState, useEffect } from 'react';
import * as sofaService from '../../services/sofaService';
import CatalogItem from './CatalogItem/CatalogItem';


export default function Catalog() {

    const [sofas, setSofas] = useState([]);
    useEffect(() => {
    
        sofaService.getAll()
            .then(result => {
              
                setSofas(result);
            })
            .catch(error => {
                console.log(error)
            })
          
    }, []);

    return (
        <section className={styles.catalog}>
            <h2>CATALOG</h2>
         
            <ul>
                {sofas.map(sofa => <CatalogItem key={sofa._id} {...sofa}/>)}
        
            </ul>
            {sofas.length === 0 && <h3>No sofas yet!</h3>}
            
        </section>
    )
}