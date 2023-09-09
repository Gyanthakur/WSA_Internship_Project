import { Link } from 'react-router-dom';
import './Footer.scss';
import Logo from "./../../assets/icons/logo2.webp"
import { FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Footer = () => {
  const items = useSelector(state => state.cart.items);
  return (
    <section
      className="footer-wrapper"
      style={{
        marginBottom: items?.length > 0 ? '40px' : '',
      }}>
      <div className="top">
        <div>
          <div className="title">Company</div>
          <a href="#">About us</a>
          <a href="#">Team</a>
          <a href="#">Career</a>
          {/* <a href="#">Swiggy Blog</a> */}
          <a href="#">Bug Bounty</a>
          {/* <a href="#">Swiggy One </a>
          <a href="#">Swiggy Corporate</a>
          <a href="#">Swiggy Instamart</a>
          <a href="#">Swiggy Genie</a> */}
        </div>
        <div>
          <div className="title">Contact</div>
          <a href="#">Help & Support</a>
          <a href="#">Partner with us</a>
          <a href="#">Ride with us</a>
        </div>
        <div>
          <div className="title">Legal</div>
          <a href="#">Terms & Conditions</a>
          <a href="#">Refund & Cancellation</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Offer Terms</a>
          {/* <a href="#">Phishing & Fraud</a>
          <a href="#">Corporate – Swiggy Money Codes Terms and Conditions</a>
          <a href="#">
            Corporate - Swiggy Discount Voucher Terms and Conditions
          </a> */}
        </div>
        <div>
          <a href="#">
            <img
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv"
              alt="appstore"
            />
          </a>
          <a href="#">
            <img
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl"
              alt="playstore"
            />
          </a>
        </div>
      </div>
      <div className="footer">
        <a href={'#'}>
          <img
            // src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza"
            // alt=""
            src={Logo} className='logoImg' alt="logo"
          />
        </a>
        <div className="copy">
          <div> &copy; 2023 Food Ordering Site for WSA Internship </div>
          <div
            style={{
              textAlign: 'center',
              padding: '5px 0',
            }}>
            by Gyan Pratap Singh (GPS)
          </div>
        </div>
        <div className="socials">
          <Link to={'https://twitter.com/gps_96169'} target="_blank">
            <FaTwitter className="icontw" />
          </Link>
          <Link to={'https://www.linkedin.com/in/gyan-pratap-singh-275785236/'} target="_blank">
            <FaLinkedinIn className="iconln" />
          </Link>
          <Link to={'https://www.instagram.com/gp.singh.ro.ckstar4438/'} target="_blank">
            <FaInstagram className="iconin" />
          </Link>
          <Link to={'https://github.com/Gyanthakur'} target="_blank">
            <FaGithub className="icongit" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
