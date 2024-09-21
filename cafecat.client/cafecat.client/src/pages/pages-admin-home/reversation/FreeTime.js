import GetTime from './GetTime';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "../../../assets/css/customerStyle.css"
const FreeTime = ({ dateTime }) => {
const data = GetTime({ dateTime });
const formatTime = (timeString) => {
    return timeString.split('.')[0]; 
  };
return (
<>
<Tabs
  defaultActiveKey="TABLE1"
  id="uncontrolled-tab-example"
  className="mb-3 custom-tabs"
  fill
>
  {console.log(data)}
{data.map((items, index) => (
  <Tab eventKey={`TABLE${index+1}`} title={`BÀN ${index+1}`} key={index}>
    <h6>SỐ CHỖ NGỒI: {items.seats}</h6>
    <h6>KHOẢNG THỜI GIAN CÓ THỂ ĐẶT BÀN</h6>
    <div className="timeline-container" >
      {items.timeIntervals.map((event, eventIndex) => (
        <div className="timeline-item" key={eventIndex}>
          <div className="timeline-icon">{formatTime(event.duration)}</div>
          <div className="timeline-content">
            <p>Start: {new Date(event.startTime).toLocaleString()}</p>
            <p>End: {new Date(event.endTime).toLocaleString()}</p>
          </div>
        </div>
    ))}
    </div>
  </Tab>
))}
</Tabs>

</>
  );
};


export default FreeTime;