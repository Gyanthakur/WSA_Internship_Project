import { useEffect } from 'react';
import './VerifyAccountPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { VERIFY_ACC_API_LINK } from '../../utils/config';
import Swal from 'sweetalert2';

const VerifyAccountPage = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const verifyAcc = async (id, token) => {
    try {
      const { data } = await axios.post(
        `${VERIFY_ACC_API_LINK}/${id}/${token}`,
        {
          id,
          token,
        }
      );
      Swal.fire('Success!', `Account verification successfull!`, 'success');
      navigate('/');
    } catch (error) {
      Swal.fire('Failed!', error.message, 'error');
    }
  };

  useEffect(() => {
    verifyAcc(id, token);
  }, []);

  return (
    <div className="verify-acc-page-wrapper">
      <div className="verify-acc-page">
        <div className="loading"></div>
        <div className="text">Please wait while verifying your account.</div>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
