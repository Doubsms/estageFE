import React, { useState, useEffect } from 'react';
import Logo from './ei_1721485295669-removebg-preview (2).png';
import Facebook from './Screenshot_20240719-173443.jpg';
import Twitter from './Capturetwitter.jpg'
import { Link } from 'react-router-dom';

const SocialIcon = ({ icon, color, size }) => {
  return (
    <i
      className={`bi bi-${icon}`}
      style={{
        color: color,
        fontSize: size,
        marginRight: '1rem'
      }}
    ></i>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////

const MyComponent = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Vérifie la taille d'écran initiale

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isDesktop ? (
        <DesktopComponent />
      ) : (
        <MobileComponent />
      )}
    </div>
  );
};

const DesktopComponent = () => {
  return (
    
      <div style={{ width:"100vw", display:"flex", flexDirection:"column", backgroundColor:"rgba(0, 0, 0, 0.69)"}} class="desktop-component">
        <div style={{display:"flex", flexDirection:"row"}}>
            <div style={{width:'23%', height:'100%', margin:"2%"}}>
                <img src={Logo} style={{width:'90%', height:"20%"}}/>
                <div style={{color:"rgba(179, 177, 177, 0.873)"}}>
                L’INS est un établissement public administratif créé par décret présidentiel N° 2001/100 du 20 avril 2001. Il est placé sous la tutelle technique du ministère en charge de la statistique. Il est doté d’une personnalité juridique et de l’autonomie financière. Son siège est fixé à Yaoundé, capitale politique du Cameroun.
                </div>
                <div >    
                <div>
                    <SocialIcon style={{margin:"3px"}} icon="facebook" color="#3b5998" size="2rem" />
                    <SocialIcon style={{margin:"3px"}} icon="twitter" color="#1da1f2" size="2rem" />
                    <SocialIcon style={{margin:"3px"}} icon="instagram" color="#e1306c" size="2rem" />
                    <SocialIcon style={{margin:"3px"}} icon="youtube" color="red" size="2rem" />
                    <SocialIcon style={{margin:"3px"}} icon="whatsapp" color="green" size="2rem" />
                </div>   
                </div>
            </div>
            <div style={{width:'23%', height:'100%', color:"white", margin:"2%",fontWeight:"bold", fontSize:"20px"}}>
                <p >SUIVEZ NOUS SUR FACEBOOK:</p>
                <div style={{width:"90%", height:"1px", backgroundColor:"white", marginBottom:"8px", marginTop:"-8px"}}></div>
                <img style={{width:"90%"}} src={Facebook}/>
            </div>
            <div style={{width:'23%', height:'100%',color:"white", margin:"2%",fontWeight:"bold", fontSize:"20px"}}>
                <p >LIENS UTILES:</p>
                <div style={{width:"90%", height:"1px", backgroundColor:"white", marginBottom:"8px", marginTop:"-8px"}}></div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <div style={{display:"flex", flexDirection:"column", fontSize:"15px"}}>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="https://ins-cameroun.cm/company-overview/organisation/">Plateforme Open Data INS</a>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="http://cameroon.opendataforafrica.org/sdg">Page des ODD</a>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="http://slmp-550-104.slc.westdc.net/~stat54/nada/index.php/home">Base de donnée NADA/ANADOC(Archive National de Données du Cameroun)</a>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="http://nso-cameroon.opendataforafrica.org/xkrcbs/national-summary-data-page">Page Nationale Récapitulatif de Données</a>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", marginLeft:"20px",fontSize:"15px"}}>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="">Galerie photos</a>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="">INS today mag</a>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="">Contact</a>
                        </div>
                    </div>

                    <Link style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} to="/admin">Log as an admin</Link>
                    <div style={{marginTop:"60px", fontSize:"18px"}}>ABONNEMENT A LA NEWSLETTER</div>
                    <br/>
                    <label>Email:</label>
                    <input style={{backgroundColor:"rgba(231, 227, 227, 0.541)", borderWidth:"0px",height:"5vh"}}/>
                    <br/>
                    <button style={{ height:"5vh", backgroundColor:"green", fontSize:"20px", color:"white"}}>souscrir</button>
                </div>
            </div>
            <div style={{width:'23%', height:'100%',color:"white", margin:"2%",fontWeight:"bold", fontSize:"20px"}}>
                <p >L'INS SUR TWITTER:</p>
                <div style={{width:"90%", height:"1px", backgroundColor:"white", marginBottom:"8px", marginTop:"-8px"}}></div>
                <img src={Twitter} style={{borderRadius:"12px",width:"90%"}}/>
            </div>
        </div>
        <footer className="bg-dark text-white text-center py-3">
            <p className="mb-0">Institut National de la Statistique du Cameroun © 2024</p>
        </footer>
        </div>
    
  );
};

const MobileComponent = () => {
  return (
    
      <div style={{ width:"100vw", display:"flex", flexDirection:"column", backgroundColor:"rgba(0, 0, 0, 0.69)"}} class="mobile-component">
        <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{width:'100%', height:'100%', margin:"2%"}}>
                <img src={Logo} style={{width:'90%', height:"20%"}}/>
                <div style={{color:"rgba(179, 177, 177, 0.873)"}}>
                L’INS est un établissement public administratif créé par décret présidentiel N° 2001/100 du 20 avril 2001. Il est placé sous la tutelle technique du ministère en charge de la statistique. Il est doté d’une personnalité juridique et de l’autonomie financière. Son siège est fixé à Yaoundé, capitale politique du Cameroun.
                </div>
                <div >    
                <div>
                    <SocialIcon style={{margin:"3px"}} icon="facebook" color="#3b5998" size="2rem" />
                    <SocialIcon style={{margin:"3px"}} icon="twitter" color="#1da1f2" size="2rem" />
                    <SocialIcon style={{margin:"3px"}} icon="instagram" color="#e1306c" size="2rem" />
                    <SocialIcon style={{margin:"3px"}} icon="youtube" color="red" size="2rem" />
                    <SocialIcon style={{margin:"3px"}} icon="whatsapp" color="green" size="2rem" />
                </div>   
                </div>
            </div>
            <div style={{width:'100%', height:'100%', color:"white", margin:"2%",fontWeight:"bold", fontSize:"20px"}}>
                <p >SUIVEZ NOUS SUR FACEBOOK:</p>
                <div style={{width:"90%", height:"1px", backgroundColor:"white", marginBottom:"8px", marginTop:"-8px"}}></div>
                <img style={{width:"90%"}} src={Facebook}/>
            </div>
            <div style={{width:'100%', height:'100%',color:"white", margin:"2%",fontWeight:"bold", fontSize:"20px"}}>
                <p >LIENS UTILES:</p>
                <div style={{width:"90%", height:"1px", backgroundColor:"white", marginBottom:"8px", marginTop:"-8px"}}></div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="https://ins-cameroun.cm/company-overview/organisation/">Plateforme Open Data INS</a>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="http://cameroon.opendataforafrica.org/sdg">Page des ODD</a>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="http://slmp-550-104.slc.westdc.net/~stat54/nada/index.php/home">Base de donnée NADA/ANADOC(Archive National de Données du Cameroun)</a>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="http://nso-cameroon.opendataforafrica.org/xkrcbs/national-summary-data-page">Page Nationale Récapitulatif de Données</a>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", marginLeft:"20px"}}>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="">Galerie photos</a>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="">INS today mag</a>
                            <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="">Contact</a>
                        </div>
                    </div>
                    
                    <a style={{fontWeight:"1px", color:"rgba(179, 177, 177, 0.873)"}} href="/admin">Log as an admin</a>

                    <div style={{marginTop:"60px", fontSize:"18px"}}>ABONNEMENT A LA NEWSLETTER</div>
                    <br/>
                    <label>Email:</label>
                    <input style={{backgroundColor:"rgba(231, 227, 227, 0.541)", borderWidth:"0px",height:"5vh"}}/>
                    <br/>
                    <button style={{ height:"5vh", backgroundColor:"green", fontSize:"20px", color:"white"}}>souscrire</button>
                </div>
            </div>
            <div style={{width:'100%', height:'100%',color:"white", margin:"2%",fontWeight:"bold", fontSize:"20px"}}>
                <p >L'INS SUR TWITTER:</p>
                <div style={{width:"90%", height:"1px", backgroundColor:"white", marginBottom:"8px", marginTop:"-8px"}}></div>
                <img src={Twitter} style={{borderRadius:"12px",width:"90%"}}/>
            </div>
        </div>
        <footer className="bg-dark text-white text-center py-3">
            <p className="mb-0">Institut National de la Statistique du Cameroun © 2024</p>
        </footer>
        </div>
    
  );
};

export default MyComponent;