const Popup = (props) => {
    return (

        <div className='outer-popup' >
            <div className='inner-popup-add' style={{ marginTop: window.innerHeight * 0.25 + window.pageYOffset }}>
                <span className='popup-header'>
                    <span className='popup-title'><strong>Add Stock</strong></span>
                    <button onClick={props.handlePopUpClose}>&#x2715;</button>
                </span>
                <div className='add-popup-data'>
                    <form className='add-popup-form' >
                        Stock Symbol
                        <input className='add-in' type="text"/>
                        Stock Name
                        <input className='add-in'  type="text"/>
                        <input type="button" className='submit' value='SUBMIT' onClick={props.handleSubmitAdd} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Popup;