import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../store/user/selectors";

export default function AddCuisineForm() {
  return (
    <div>
      <div>Let's start with your own adventure...</div>

      <div>
        <Container>
          {" "}
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-5">Go ahead ✌️ </h1>
            <Form.Group controlId="formBasicName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cuisine title"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.File label="Upload your image:" type="file" name="file" />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Row>
                <Col>
                  <Form.Label>Servings</Form.Label>

                  <Form.Control placeholder="Servings" />
                </Col>
                <Col>
                  <Form.Label>Cooking Time</Form.Label>

                  <Form.Control placeholder="Cooking Time in min" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Calories</Form.Label>

                  <Form.Control placeholder="Calories per serving" />
                </Col>
              </Row>
            </Form.Group>{" "}
            <Form.Group controlId="formBasicName">
              <Form.Label>Cuisine Type</Form.Label>

              <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                custom
              >
                <option value="0">Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Control>
            </Form.Group>{" "}
            <Form.Group controlId="form-instruction">
              <Form.Label>Cuisine Instructions</Form.Label>
              <Form.Control as="textarea" rows={10} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>{" "}
        </Container>
      </div>
    </div>
  );
}
