import styles from './GlassCard.module.css'
import Image from 'next/image';
import Link from 'next/link';

const GlassCard = (props) => {
    return ( 
        <div className={styles.glassContainer}>
            <Link href={props.href} passHref>
            <a >
            <div className={styles.glass}>
                <h5>{props.storeName}</h5>
                <div className={styles.imgContainer}>
            <Image src={props.imgUrl || ``} layout='fill' quality={60} alt={`coffee shop ${props.storeName}`}   />
                </div>
            </div>
            </a>
        </Link>
        </div>
     );
}
 
export default GlassCard;