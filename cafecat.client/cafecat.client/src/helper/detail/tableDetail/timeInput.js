import React, {useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const TimeInput = ({handleChange}) => {

    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('0');
    const [seconds, setSeconds] = useState('0');
    
    useEffect(()=>{
        handleChange(`${hours}:${minutes}:${seconds}`, 'reservationTime')
    },[hours,minutes,seconds])


  const handleHoursChange = (event) => setHours(event.target.value);
  const handleMinutesChange = (event) => setMinutes(event.target.value);
  const handleSecondsChange = (event) => setSeconds(event.target.value);

  return (
    <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Thời gian</InputGroup.Text>
    <Form.Control
      required
      type="number"
      value={hours}
      onChange={handleHoursChange}
      min="0"
      max="23"
      placeholder="Giờ"
    />
    <Form.Control
      required
      type="number"
      value={minutes}
      onChange={handleMinutesChange}
      min="0"
      max="59"
      placeholder="Phút"
    />
    <Form.Control
        type="number"
        value={seconds}
        onChange={handleSecondsChange}
        min="0"
        max="59"
        placeholder="Giây"
    />
</InputGroup>

  );
};

export default TimeInput;
