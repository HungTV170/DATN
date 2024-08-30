import { Form, Button, Row, Col } from 'react-bootstrap';

const FieldForm = ({
    fields,
    handleChange,
    handleRemoveField,
    handleSubmit
}) => {
    return (
        <div style={{ minHeight: '400px' }}>
            {fields === null || fields.length === 0 ? (
                <>Chưa có món ăn</>
            ) : (
                <Form onSubmit={handleSubmit} >
                    {fields.map((field, index) => (
                        <Form.Group as={Row} key={index} className="mb-3">
                            <Form.Label column sm={6}>
                                {field.label}: Số Lượng
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="number"
                                    value={field.value}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </Col>
                            <Col sm={2}>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleRemoveField(field.id)}
                                >
                                    X
                                </Button>
                            </Col>
                        </Form.Group>
                    ))}
                    <Button variant="primary" type="submit">
                        Lưu
                    </Button>
                </Form>
            )}
        </div>
    );
}

export default FieldForm;
