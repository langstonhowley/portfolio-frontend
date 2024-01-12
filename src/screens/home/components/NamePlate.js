import './NamePlate.css'


const NamePlate = () => {
    return (
        <div className='nameplate'>
            <h1 className='site-title'>Langston Howley</h1>
            <p>Full Stack Developer / Artist Based in Washington, DC</p>
            <br/>
            <div className='langstonImgCont'>
                <img src='/images/Langston.jpg' className='langstonIMG' alt="I'm supposed to be here"></img>
            </div>
            <div className='langstonIMGoverlay'>
                <p>Man, Myth, Legend</p>
            </div>
        </div>
    )
}

export default NamePlate;