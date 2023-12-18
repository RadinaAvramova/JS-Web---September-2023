import styles from './About.module.css';

export default function About() {
    return (
        <section className={styles.welcome}>
            <h2>Welcome to the world of sofas</h2>
            <p>Here you will find a wide variety of sofas, the perfect solution for your interior. We have a large
                range of models, colors, designs and sizes. We work on individual projects, taking into account the
                specific requirements of each.
            </p>
            <img src="/Images/2.jpg" alt="sofas" />
            <h3>Types of internal sofas: </h3>
             <div>
                <span>Traditional Sofa, </span>
                <span>Camelback Sofa, </span>
                <span>Chesterfield Sofa, </span>
                <span>Daybed, </span>
                <span>English Roll Arm Sofa </span>
                <span>Knole Sofa</span>
                <span>Contemporary Sofas </span>

            </div> 

        </section>
    )
}