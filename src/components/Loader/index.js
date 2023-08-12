import styles from './loader.module.css';

const Loader = ({ isShow }) => {
    return (
        <>
            {
                isShow ? (
                    <div className={styles.loader}>
                        <img src="/loader.png" alt='page loader'/>
                    </div>
                ) : (<div></div>)
            }
        </>
    );
}


export default Loader