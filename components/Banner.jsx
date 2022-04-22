import styles from './Banner.module.css'
import Link from 'next/link';
import Button from './useful/Button';
const Banner = () => {
    return ( 
        <>
        <section className={styles.banner}>
        <div className={styles.textContainer}>
        <h3>fresh <span>coffee</span> in the morning</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat labore, sint cupiditate distinctio tempora reiciendis.</p>
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