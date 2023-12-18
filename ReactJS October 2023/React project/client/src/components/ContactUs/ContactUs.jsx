import styles from './ContactUs.module.css';

export default function ContactUs() {
    return (
        <section className={styles["contact-us"]} id="contact-us">
            <div className={styles.contact}>
                <h2>Interior design LTD</h2>
                <p>Here you will find a wide variety of sofas, the perfect solution for your interior. We have a large
                    range of models, colors, design and sizes. </p>
                <p>We are always at your disposal. Do not hesitate to contact us for a personal consultation and to satisfy your desire.</p>
                <p>Bulgaria</p>
                <p>+359 886 *** ***</p>
                <p>email: sofas-of-dreams@gmail.com</p>
            </div>
            <div className={styles["contact-form"]}>

                <img src='/Images/111.jpg' width="470px" alt="sofas" />
              
            </div>


        </section>
    )
}
