import { useRef, useState } from "react";
import styles from "./UserForm.module.css";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes.json";
import { backgroundColorHoC } from "../hoc/backgraundColorHoC";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const UserForm = ({ children }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();

  const reRenderCount = useRef(0);
  const navigate = useNavigate();
  // Consume the context data
  const { isDark } = useContext(ThemeContext);
  console.log(isDark);

  // Define the setUser function here or import it from the appropriate module
  const setUser = async (user) => {
    // Placeholder implementation - replace with your actual API call
    return new Promise((resolve, reject) => {
      // Simulate a successful response after a short delay (1 second)
      setTimeout(() => {
        const responseData = { id: 123 }; // Replace with your actual response data
        resolve(responseData);
      }, 1000);
    });
  };

  const resetField = () => {
    setFname("");
    setLname("");
    setEmail("");
    setMobile("");
    setSuccessMsg("");
    setErrorMsg("");
  };

  const showSuccessMsg = (Msg) => {
    setSuccessMsg(Msg);
    setTimeout(() => {
      setSuccessMsg("");
    }, 10000);
  };

  const showErrorMsg = (Msg) => {
    setErrorMsg(Msg);
    setTimeout(() => {
      setErrorMsg("");
    }, 10000);
  };

  const isValidate = () => {
    // Specific form validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validations = [
      {
        isvalid: !fname,
        errorMsg: "Please enter the first name",
        refElem: fnameRef,
      },
      // Add other validation rules as needed
    ];

    for (const validate of validations) {
      if (validate.isvalid) {
        showErrorMsg(validate.errorMsg);
        // Focus code for error field
        validate.refElem.current.focus();
        return false;
      }
    }

    return true;
  };

  const createUserHandler = () => {
    if (!isValidate()) {
      return;
    }

    const user = {
      fname,
      lname,
      email,
      mobile,
    };

    setIsLoading(true);

    setUser(user)
      .then((data) => {
        console.log("data", data);
        resetField();
        setTimeout(() => {
          setIsLoading(false);
          showSuccessMsg(
            `User has been created with user id: ${data.id}, you will be redirected to Home Page`
          );
          console.log("Navigating to Profiles Page with userData:", user);
          navigate(`/${routes.PROFILES}`, { state: { userData: user } });
        }, 500);
      })
      .catch(() => {
        setIsLoading(false);
        showErrorMsg("There is an error, Please try again!!!");
      });
  };

  return (
    <div className="container">
      <div className="m-5">
        <Row className="mt-3 md-3">
          <Col>
            <label htmlFor="fname">First name</label>
          </Col>
          <Col>
            <input
              ref={fnameRef}
              className={styles.inputFields}
              type="text"
              id="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mt-3 md-3">
          <Col>
            <label htmlFor="lname">Last name</label>
          </Col>
          <Col>
            <input
              ref={lnameRef}
              className={styles.inputFields}
              type="text"
              id="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mt-3 md-3">
          <Col>
            <label htmlFor="email">Email id </label>
          </Col>
          <Col>
            <input
              ref={emailRef}
              className={styles.inputFields}
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mt-3 md-3">
          <Col>
            <label htmlFor="number">Mobile No.</label>
          </Col>
          <Col>
            <input
              ref={mobileRef}
              className={styles.inputFields}
              type="number"
              id="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mt-3 md-3">
          <Col>
            <Button
              disabled={isLoading}
              variant="primary"
              onClick={createUserHandler}
            >
              Create User
            </Button>
          </Col>
          <Col>
            <Button onClick={resetField} variant="secondary">
              Reset Form
            </Button>
          </Col>
        </Row>
        {isLoading && (
          <Row className="mt-3 md-3">
            <div>Loading...</div>
          </Row>
        )}
        {errorMsg && (
          <Row className="mt-3 md-3">
            <div className={styles.errorMsg}>{errorMsg}</div>
          </Row>
        )}
        {successMsg && (
          <Row className="mt-3 md-3">
            <div className={styles.successMsg}>{successMsg}</div>
          </Row>
        )}
        <Row className="mt-3 md-3">
          <div>Re-rendering count: {++reRenderCount.current}</div>
        </Row>
      </div>
    </div>
  );
};

export default backgroundColorHoC(UserForm);

UserForm.propTypes = {
  children: PropTypes.node,
};
