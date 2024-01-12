import './SeniorProject.css'
import React from 'react'

const SeniorProject = () => {
    return (
        <div className="sp-main project-slide" id='senior-project'>
            <div className='description'>
                <div className='desc-grid-item-1'>
                    <h1>Studying the Stars with Astropy</h1>
                </div>
                <div className='desc-grid-item-2'>
                    <p>My Senior Individualized Project at Kalamazoo College dealt with exploring and explaining the capabilities of the Astropy library.</p>
                    <br/>
                    <div>
                        <ul>
                            <li className='ltitle'>Python Libraries:</li>
                            <ul>
                                <li><a href='https://docs.astropy.org/en/stable/index.html' target="_blank" rel="noreferrer">Astropy</a></li>
                                <li><a href='https://astroquery.readthedocs.io/en/latest/' target="_blank" rel="noreferrer">Astroquery</a></li>
                                <li><a href='https://matplotlib.org/' target="_blank" rel="noreferrer">Matplotlib</a></li>
                                <li><a href='https://numpy.org/' target="_blank" rel="noreferrer">NumPy</a></li>
                            </ul>
                        </ul>
                        <hr/>
                        <ul>
                            <li className='ltitle'>Worked on:</li>
                            <ul>
                                <li><a href='https://gaia.aip.de/' target='_blank' rel="noreferrer">Gaia</a> and <a href='https://simbad.u-strasbg.fr/simbad/' target='_blank' rel="noreferrer">SIMBAD</a></li>
                                <li>Modeling</li>
                                <li>Data Analytics</li>
                            </ul>
                        </ul>
                    </div>
                </div>
                <div className='desc-grid-item-3'>
                    <div>
                        <h3>Figure One (Top)</h3>
                        <p>The color of the stars indicate their peak wavelength which is the “color” most emitted in the stellar spectra. This curve in astronomy is known as the Hertzsprung-Russell Diagram and gives astronomers a view into stellar evolution. The HR diagram plots stars against their luminosity and temperature but these are proportional to the magnitude so both graphs reveal the same curve.</p>
                    </div>
                    <div>
                        <h3>Figure Two (Bottom Left)</h3>
                        <p>Graph showing Flux (energy output) vs Wavelength (length of electromagnetic radiation) of different Black Body curves showing that a hotter object (in this context a star) emits shorter wavelengths as well as greater amounts of energy.</p>
                    </div>
                    <div>
                        <h3>Figure Three (Figures 5a & 5b)</h3>
                        <p>astropy.modeling allows for compound models and how it shows the height of the H-alpha line denoting magnetic activity in stars.</p>
                    </div>
                </div>
            </div>
            <div className='imageHolder'>
                <div className="img-grid-item img-grid-item1">
                    <img src="/images/HRdiag.png" alt="H-R Diagram" />
                </div>
                <div className="img-grid-item img-grid-item2">
                    <img src="/images/Flux Graph.png" alt="Flux Graph" />
                </div>
                <div className="img-grid-item img-grid-item3">
                    <img src="/images/starmodeling.png" alt="Flux Modeling" />
                </div>
            </div>
        </div>
    )
}

export default SeniorProject;