import { BiCheese,BiHeart } from 'react-icons/bi';

 const Footer = () => {
    return (
        <footer className="page-footer font-small pt-4 navBg">
            <div className="container text-center">
                <div className="footer-content">
                    <h5><b>I</b></h5><BiHeart/><BiCheese/>
                </div>
            </div>
        </footer>
    );
}
export default Footer;