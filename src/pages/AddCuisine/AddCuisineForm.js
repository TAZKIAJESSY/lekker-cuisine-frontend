import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { selectUser, selectToken } from "../../store/user/selectors";
import { addCuisine } from "../../store/cuisineHome/actions";

export default function AddCuisineForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [message, set_message] = useState("");

  const [title, set_title] = useState("");
  const [instructions, set_instructions] = useState("");
  const [imageUrl, set_imageUrl] = useState("");
  const [cuisineType, set_cuisineType] = useState("");
  const [cookingTime, set_cookingTime] = useState("");
  const [servings, set_servings] = useState("");
  const [calories, set_calories] = useState("");

  const [inputIngredients, setInputIngredients] = useState([
    {
      amount: "",
      ingredientName: "",
    },
  ]);

  const uploadImage = async (e) => {
    console.log("triggered");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "yqgx1df1");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/jessy/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log("fiel", file.url);

    set_imageUrl(file.url);
  };

  console.log(imageUrl);

  const formSubmit = (event) => {
    set_message("Successfully created your new cuisine! ");
    event.preventDefault();

    dispatch(
      addCuisine({
        title,
        instructions,
        cookingTime,
        servings,
        calories,
        imageUrl,
        cuisineType,
        inputIngredients,
        user,
      })
    );

    set_title("");
    set_instructions("");
    set_imageUrl("");
    set_cuisineType("");
    set_cookingTime("");
    set_servings("");
    set_calories("");

    setInputIngredients([
      {
        amount: "",
        ingredientName: "",
      },
    ]);
  };

  const handleAddClick = () => {
    setInputIngredients([
      ...inputIngredients,
      {
        amount: "",
        ingredientName: "",
      },
    ]);
    console.log(inputIngredients);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputIngredients];
    list.splice(index, 1);
    setInputIngredients(list);
  };

  function handleInputChange(e, index) {
    const { name, value } = e.target;
    const ingredientsList = [...inputIngredients];
    ingredientsList[index][name] = value;
    setInputIngredients(ingredientsList);
  }

  useEffect(() => {
    // checks if there is a user signed in, if not the user gets redirected do frontpage
    if (token === null) {
      history.push("/");
    }
  }, [token, history]);

  return (
    <div>
      <div>Let's start with your own adventure...</div>

      <div>
        <div className="App">
          <h1>Cloudinary Upload</h1>
          <input
            type="file"
            name="file"
            placeholder="drag it here"
            onChange={uploadImage}
          />
        </div>
        <Container
        //   style={{
        //     backgroundImage: `url("https://cdn4.vectorstock.com/i/1000x1000/75/53/chef-cook-avatars-and-user-icons-vector-2567553.jpg")`,
        //   }}
        >
          {" "}
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-5">Go ahead ✌️ </h1>
            <Form.Group controlId="formBasicName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cuisine title"
                value={title}
                onChange={(event) => set_title(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                label="Upload your image:"
                type="file"
                name="file"
                // value={imageUrl}
                onChange={(event) => set_imageUrl(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Servings</Form.Label>

                  <Form.Control
                    placeholder="Servings"
                    value={servings}
                    onChange={(event) => set_servings(event.target.value)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Cooking Time</Form.Label>

                  <Form.Control
                    placeholder="Cooking Time in min"
                    type="numb"
                    value={cookingTime}
                    onChange={(event) => set_cookingTime(event.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Calories</Form.Label>

                  <Form.Control
                    placeholder="Calories per serving in cal"
                    value={calories}
                    onChange={(event) => set_calories(event.target.value)}
                    required
                  />
                </Col>
              </Row>
            </Form.Group>{" "}
            <Form.Group>
              <Form.Label>Cuisine Type</Form.Label>

              <Form.Control
                as="select"
                className="my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                custom
                value={cuisineType}
                onChange={(event) => set_cuisineType(event.target.value)}
                required
              >
                <option value="0">Choose...</option>
                <option value="Italian">Italian</option>
                <option value="French">French</option>
                <option value="Thai">Thai</option>
                <option value="Mixed">Mixed</option>
              </Form.Control>
            </Form.Group>{" "}
            {inputIngredients.map((inputIngredient, index) => {
              return (
                <div className="ingredients-row" key={index}>
                  <Row>
                    <Col>
                      <input
                        name="ingredientName"
                        placeholder="Enter ingredient"
                        className="ml-1"
                        value={inputIngredient.ingredientName}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />

                      <input
                        name="amount"
                        type="text"
                        className="ml-1"
                        placeholder="Enter amount"
                        value={inputIngredient.amount}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                    </Col>
                    <Col>
                      {inputIngredients.length !== 1 && (
                        <Button
                          className="ml-1"
                          variant="outline-secondary"
                          onClick={() => handleRemoveClick(index)}
                        >
                          Remove
                        </Button>
                      )}
                      {inputIngredients.length - 1 === index && (
                        <Button
                          variant="outline-secondary"
                          className="ml-1"
                          onClick={handleAddClick}
                        >
                          Add
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              );
            })}
            <Form.Group>
              <Form.Label>Cuisine Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={instructions}
                onChange={(event) => set_instructions(event.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={formSubmit}>
              Submit
            </Button>
          </Form>{" "}
        </Container>
      </div>
      <p style={{ marginTop: 20, color: "teal", fontSize: 20 }}>
        <b>{message}</b>
      </p>
    </div>
  );
}
