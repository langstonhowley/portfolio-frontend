import './AboutMeBox.css';

const AboutMeBox = () => {
    return (
        <div className='aboutMeCont'>
            <div className='languages'>
                <p className='heading'>Languages:</p>
                <ul>
                    <li>Python</li>
                    <li>Javascript / Typescript</li>
                    <li>React</li>
                    <li>HTML / CSS</li>
                    <li>C / C#</li>
                    <li>Swift</li>
                    <li>Bash</li>
                </ul>
            </div>
            <div className='languages'>
                <p className='heading'>Work Experience:</p>
                <ul>
                    <li>APIs</li>
                    <li>Web Development</li>
                    <li>GCP</li>
                    <li>SQL / MongoDB</li>
                    <li>iOS / MacOS</li>
                    <li>Windows</li> 
                    <li>Remote Access</li>  
                </ul>
            </div>
        </div>
    )
}

export default AboutMeBox;