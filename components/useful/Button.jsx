
import styles from './Button.module.css'
import  Link  from 'next/link';

const { btn , btnBlack , btnGold ,noAnimate } = styles;
const Button = ({color,children,href,animate, ...otherProps}) => {
    //animate props is for handling btn animation
    let classVar = color ==='gold' ? `${btn} ${btnGold}`: `${btn} ${btnBlack}`;
    if(!animate) {classVar+= ` ${noAnimate}`}
    return ( 
        <>
        <Link href={href || '/'} passhref scroll={false}> 
        <a className={classVar} {...otherProps} >
        {children}</a>
        </Link>
        </>
     );
}
 
export default Button;