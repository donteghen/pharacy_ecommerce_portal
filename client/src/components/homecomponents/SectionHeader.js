import React from 'react'
import styles from './SectionHeader.module.css'
const SectionHeader = (props) =>{
    return (
        <div >
            <div className='row ' >
            <div className='col s12 m6 l10'>
                <h3>{props.first.mainHeader}</h3>
                <p>{props.first.subHeader}</p>
            </div>
            <div className='col s12 m6 l2'>
                <p><button className={styles.section_btn}>{props.first.btnText}</button></p>
            </div>
            </div>
        </div>

    )
}
export default SectionHeader