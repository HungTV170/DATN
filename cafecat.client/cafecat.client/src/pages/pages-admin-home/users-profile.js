
import {Row,Col,Card,Tabs,Tab} from 'react-bootstrap';
import ChangePass from './profile/changePass';
import ChangeProfile from './profile/changeProfile';
const UserProfile = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return (
    <>

<section className="section profile">
  <Row>
      <Col md={4}>
        <Card>
            <Card.Body className="d-flex flex-column align-items-center">
              <h3>{userData.firstName} {userData.lastName}</h3>
              <img src={`${process.env.PUBLIC_URL}/assets/img/Account.jpg`} alt="Account" 
                    className="rounded-circle" 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    />
              <h4><i>{userData.role}</i></h4>
            </Card.Body>
        </Card>
      </Col>
      <Col md={8}>
        <Card>
            <Card.Body>
              <Tabs>
                <Tab eventKey="Overview" title="Overview">
                  <b><p>Full Name</p></b>
                  <p>{userData.firstName} {userData.lastName}</p>
                  <b><p>Email</p></b>
                  <p>{userData.email}</p>
                  <b><p>Phone Number</p></b>
                  <p>{userData.phoneNumber}</p>
                  <b><p>Role</p></b>
                  <p>{userData.role}</p>
                  <b><p>Employee Id</p></b>
                  <p>{userData.employeeId}</p>
                </Tab>
                <Tab eventKey="Edit" title="Edit Profile">
                  <ChangeProfile/>
                </Tab>
                <Tab eventKey="Password" title="Change Password">
                  <ChangePass/>
                </Tab>
              </Tabs>
            </Card.Body>
        </Card>
      </Col>
  </Row>
  </section>

    </>
  )

};

export default UserProfile;
