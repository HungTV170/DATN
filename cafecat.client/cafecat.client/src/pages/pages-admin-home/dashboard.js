import { Card,Row,Col } from "react-bootstrap";
import Chart from "./dashboard/chart";
import Revenue from "./dashboard/revenue";
import Customer from "./dashboard/customers";
import Items from "./dashboard/Items";
const dashboard=()=>{
    return(
        <>
        <Row>
            <Col>
            <Card>
                <Card.Body>
                <Card.Title><h5>Đồ Ăn & Uống <span>|Hôm nay</span></h5></Card.Title>
                    <Items/>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card>
                <Card.Body>
                <Card.Title><h5>Khách Hàng <span>|Hôm nay</span></h5></Card.Title>
                    <Customer/>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        <Row>
        <Card>
                <Card.Body>
                <Card.Title><h5>Doanh thu <span>|Hôm nay</span></h5></Card.Title>
                    <Revenue/>
                </Card.Body>
            </Card>
        </Row>
        <Row>
        <Card>
                <Card.Body>
                    <Card.Title><h5>Báo Cáo <span>/Hôm nay</span></h5></Card.Title>
                    <Chart/>
                </Card.Body>
            </Card>
        </Row>
        </>

)
}
export default dashboard;