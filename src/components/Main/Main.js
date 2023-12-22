import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import './main.css';
import Modal from "../Modal";
import { IoMenuOutline, IoLogoInstagram, IoClose } from 'react-icons/io5'
import { AiFillLinkedin, AiOutlineFacebook, AiOutlineGithub, AiOutlineMail } from 'react-icons/ai';
import {
    plain,
    tomatoes,
    seafood,
    basil,
    takeout,
    drinks,
    cocktails,
    dining,
    dessert,
    cannoli
} from '../../assets/images';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const Main = () => {

    //open hamburger overlay menu
    const [menuOpen, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(current => !current);
    };
    
    //open reservation modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openReserve = () => {
        setIsModalVisible(current => !current);    
    }

    //top navbar color and transition on scroll
    const [navColor, setNavColor] = useState("transparent");
    const [textSize, setTextSize] = useState("55px")
    const listenScrollEvent = () => {
        window.scrollY > 10 ? setNavColor("#434745") : setNavColor("transparent");
        window.scrollY > 10 ? setTextSize("40px") : setTextSize("55px");
   }
   useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
    return () => {
            window.removeEventListener("scroll", listenScrollEvent);
    };
    }, []);

    //gsap animation
    const title = useRef(null);
    const subtitle = useRef(null);
 
    useEffect(() => {
       
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {

        const tlOne = gsap.timeline();

            tlOne.from(title.current, {
                duration: 1.5,
                opacity: 0,
                x: -1600,
                ease: "sine.out"
            });

            tlOne.from(subtitle.current, {
                duration: 1.5,
                opacity: 0,
                x: -1600,
                ease: "sine.out"
            }, "<");
        

        const tl= gsap.timeline({
            scrollTrigger: {
                trigger: ".subtitle",
                start: "bottom 10%",
                end: "+=320",
                scrub: 2,
                toggleActions: "play none none reverse"
            }
        });
            tl.from(".overlap-picture", {
                opacity: 0,
                duration: 2.2,
                delay: 0.5,
                scale: 0,
                ease: "sine.out",
            });

            tl.from(".middle-text", {
                ease: "sine.out",
                x: -1200,
                duration: 1.5,
                delay: 2,
                opacity: 0
            },"+=2");

            gsap.to("#pic1", {
                y:"-=20",
                ease: "sine.inOut",
                repeat:-1,
                duration:4,
                yoyo: true,
                repeatDelay: 0,
            });

            gsap.to("#pic2", {
                y:"+=15",
                ease: "sine.inOut",
                repeat:-1,
                duration:4,
                yoyo: true,
                repeatDelay: 0,
            });

            gsap.to("#pic3", {
                y:"+=25",
                ease: "sine.inOut",
                repeat:-1,
                duration:5,
                yoyo: true,
                repeatDelay: 0,
         });

            gsap.from(".bottom-text", {
                scrollTrigger: {
                    trigger: ".middle-text",
                    start:"top",
                    end: "top 50%",
                    duration: 1.5,
                    ease: "sine.out",
                    scrub: 1
            },
                opacity: 0,
                x: 1200,
            });
        })
    
    return () => ctx.revert();
   
    }, []);

    //overlay menu GSAP animation 
    
    const menuRef = useRef(null);
    const reserveRef = useRef(null);
    const logoRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            const timeline = gsap.timeline();

            timeline.from(menuRef.current, {
                duration: 0.5,
                opacity: 0,
                x: -1600,
                ease: "sine.out",
            }, menuRef);

            timeline.from(".overlay a", {
                duration: 0.5,
                delay: 0.3,
                opacity: 0,
                stagger: 0.2,
                ease: "power1.in",
                y: 0,       
            });

           timeline.from(reserveRef.current, {
                duration: 0.5,
                delay: 0.2,
                opacity: 0,
                ease: "power1.in",
                y: 0,
            });

            timeline.from(logoRef.current, {
                duration: 0.3,
                delay: 0.1,
                opacity: 0,
                ease: "power1.in",
                x: -1600,
            });  
        })

        return () => ctx.revert();

    }, [menuOpen]);

    return ( 
        <section id="main">
            <div 
                className="nav-container" 
                style={{
                    backgroundColor: navColor,
                    transition: "1s",
                 }}
                 > 
                <button onClick={handleClick}><IoMenuOutline /></button>
                <div className="logo" 
                    style={{fontSize: textSize, transition:"1s"}}>
                    <span> ITALIAN </span> RESTRO </div>
                <ul className="nav-links">
                    <li><a href="#main">Menu</a></li>
                    <li style={{borderLeft:"0", borderRight:"0"}}><a href="#main">Order Online</a></li>
                    <li><a href="#" onClick={openReserve}>Reservations</a></li>
                </ul>
            </div>
            {menuOpen && (
                <section id="menu" className="overlay" ref={menuRef}>
                    <button className="close" onClick={handleClick}><IoClose /></button>
                    <div className="overlay-content">
                        <ul>
                            <li><a href="#main">Home</a></li>
                            <li><a href="#main">About</a></li>
                            <li><a href="#main">Order Online</a></li>
                            <li><a href="#" onClick={openReserve}>Reservations</a></li>
                            <li><a href="menu">Menu</a></li>
                            <li><a href="mission">Gallery</a></li>
                        </ul>
                        <button className="overlay-reserve" ref={reserveRef} onClick={openReserve}>Book a Table</button>
                        <div className="overlay-logo" ref={logoRef}>
                            <span>Gaurav </span> Bhoi
                        </div>
                    </div>
                </section>
            )}
            <div className="sidebar"> 
                <hr className="toggle-line"></hr>
                <span>G</span>
                <span>A</span>
                <span>u</span>
                <span>R</span>
                <span>A</span>
                <span>V</span>
               <span className="social"><a href="https://twitter.com/GauravB94714559? s=09"><AiOutlineFacebook /></a></span>
               <span className="social"><a href="https://instagram.com/luffy__078?igshid=YmMyMTA2M2Y="><IoLogoInstagram /></a></span>
            </div>
            <p className="title" ref={title}> Traditional Homemade Ingredients </p>
            <p className="subtitle" ref={subtitle}> Authentic Italian <br /> Dining </p>
            <div className="main-background">
                <div className="main-image" id="image4" />
                <div className="main-image" id="image3" />
                <div className="main-image" id="image2" />
                <div className="main-image" id="image1" />  
           </div>
            <div className="welcome-content">
                    <p className="mission">Our Mission</p>
                <div className="welcome-container">
                    <p className="statement">
                        Italian Restro is a proud establishment, rich with Italian heritage located in the suburbs of Boston. Inspired by our grandmother, known as "Ramila",
                        we strive to emulate the ingredients and care that have gone into centuries of cooking passed down from our ancestors. Gaurav's dedication and love of food 
                        preparation shines throughout our menu. 
                    </p>
                    <p className="statement">
                        We strive to provide only the most authentic, freshest ingredients we can get our hands on. Quite literally,
                        as all our pastas are fresh and handmade. Whether you are joining us for dinner, a private party, or any occasion,
                        here at Zia Mia, our doors are open and ready to provide you with a memorable Italian dining experience. Mangia!
                    </p> 
                </div>
                    <button className="menu-view" href="#">View Our Menu</button>
                    <img className="overlap-picture" src= {plain} alt="fettucine dough"/>
            <div className="middle-content">
                    <h2 className="middle-text">
                    Savory and
                    <br />
                    Elegant
                    <br />
                    Cuisine
                    </h2>
                    <img src={tomatoes} id="pic1" alt="tomatoes" />
                    <img src={seafood} id="pic2" alt="bowl of pasta" />
                    <img src={basil} id="pic3" alt="basil leaf"/>   
            </div>
                 </div>
             <div className="menu-container">
                <div id="bottom-menu">
                    <h3 className="bottom-text">
                    View Our Menu
                    </h3>
                </div>
                    <div className="menu">
                        <div>
                            <img src={takeout} className="takeout" alt="pasta" />
                            <div className="image-overlay" id="takeout">Takeout<br />Menu</div>
                        </div>
                        <div>
                            <img src={drinks} className="happyhour" alt="drinks" />
                            <div className="image-overlay" id="happy">Happy<br />Hour</div>
                        </div>
                        <div>
                            <img src={cocktails} className="drinks" alt="cocktails" />
                            <div className="image-overlay" id="drinks">Drink<br />Menu</div>
                        </div>
                        <div>
                            <img src={dining} className="dining" alt="food on table" />
                            <div className="image-overlay" id="dining">Dining<br />Menu</div>
                        </div>
                        <div>
                            <img src={dessert} className="dessert" alt="tiramisu" />
                            <div className="image-overlay" id="dessert">Dessert<br />Menu</div>
                        </div>
                        <div className="cannoli">
                            <img src={cannoli} className="cannoli" alt="cannoli" />
                            
                        </div> 
                 </div>
                    <div className="footer">
                        <div className="footer-content">
                            <div className="footer-content-wrap">
                                <span>ITALIAN</span>RESTRO
                            </div>
                            <div className="footer-logo">
                              <ul className="footer-menu">
                                <li><a href="#main">Home</a></li>
                                <li>About</li>
                                <li>Order Online</li>
                                <li><a href="#" onClick={openReserve}>
                                Reservations</a></li>
                                <li>Menu</li>
                                <li>Gallery</li>
                              </ul>
                              <div className="footer-info">
                                    Swaminarayan Temple,
                                <span>Narhe , Pune</span>
                                    Copyright 2023
                                <button className="footer-button" href="#main">
                                    Order
                                </button>
                                <button className="footer-button" href="#" onClick={openReserve}>
                                    Reserve 
                                </button>
                            </div>
                            </div>
                            <div className="bottom-footer">Sunday - Thursday: 11am - 10pm <span>Friday & Saturday: 11am - 12am</span></div>
                            <br />
                            <span className="byline">Developed by Gaurav Bhoi
                            <br />
                           Photos by Unsplash
                           </span>
                            <div className="bottom-socials">
                                <a href="http://github.com/Gaurav306193"><AiOutlineGithub></AiOutlineGithub></a>
                                <a href="http://www.linkedin.com/in/gaurav-nitin-bhoi-597968207"><AiFillLinkedin></AiFillLinkedin></a>
                                <a href="mailto: bhoinitin655@gmail.com"><AiOutlineMail></AiOutlineMail></a>
                            </div>
                        </div>   
                </div>
                </div>
                {isModalVisible && (
                <Modal onModalClose={() => setIsModalVisible(false)}>
                    <Modal.Header>Book A Table</Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                </Modal>
                )}    
        </section>    
    )
}

export default Main;