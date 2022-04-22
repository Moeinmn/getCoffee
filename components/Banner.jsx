import styles from './Banner.module.css'
import Link from 'next/link';
import Button from './useful/Button';
const Banner = () => {
    return ( 
        <>
        <section className={styles.banner}>
        <div className={styles.textContainer}>
        <h3>fresh <span>coffee</span> in the morning</h3>
        <p>Easily get Best Coffee Shops around you with only one click</p>
        <Link href='#locationList' passHref>
        <Button color='gold' animate>
            Get Yours Now
        </Button>
        </Link>
        </div>
        </section>
        </>
     );
}
 
export default Banner;