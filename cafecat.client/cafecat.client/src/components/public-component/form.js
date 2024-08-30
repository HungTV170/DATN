import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState ,useEffect } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function IForm({ col ,Id, method ,apiData ,onApiDataChange,}) {

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(apiData);

    useEffect(() => {
        Array.isArray(apiData) ? 
        setFormData(apiData[0]) : setFormData(apiData);
    }, [apiData]);

    const handleChange = (content, key) => {
        const newFormData = {
            ...formData,
            [key]: content
        };
        setFormData(newFormData);
    }; 

    
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }else{
        event.preventDefault(); 
        Id != null ?  method(Id,formData) : method(formData);
        onApiDataChange(formData);
      }
  
      setValidated(true);
    };
    const renderFormGroup = (item, index) => {
        switch(item.type){
            case "ckeditor":
                return (
                    <Form.Group className="mb-3" controlId={`formBasicCKEditor-${index}`} key={index}>
                        <Form.Label>{item.label}</Form.Label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData[item.key] || ''}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                handleChange(data, item.key);
                            }}
                        />
                    </Form.Group>
                );
            default:
                return(
                    <Form.Group className="mb-3" controlId={`formBasicEmail-${index}`} key={index}>
                        <Form.Label>{item.label}</Form.Label>
                        <Form.Control 
                            required type={item.type} 
                            placeholder={item.placeholder || "Enter email"} 
                            value={formData[item.key] || ''}
                            onChange={(e) => handleChange(e.target.value, item.key)}
                            disabled={item.isDisabled ? true : false} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {item.feedBack}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
                    </Form.Group>)
        }
};

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {Array.isArray(col) ? col.map(renderFormGroup) : renderFormGroup(col)}
            <Form.Group className="mb-3">
                <Form.Check
                required
                label="đồng ý với các điều khoản"
                feedback="Bạn phải đồng ý với các điều khoản trước khi nhấn."
                feedbackType="invalid"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
    );
}

export default IForm;
