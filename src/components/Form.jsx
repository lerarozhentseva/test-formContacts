/* eslint-disable default-case */
import {
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";

export default function FormContacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [nameClick, setNameClick] = useState(false);
  const [emailClick, setEmailClick] = useState(false);
  const [nameError, setNameError] = useState("Это поле не может быть пустым");
  const [emailError, setEmailError] = useState("Это поле не может быть пустым");
  const [formValid, setFormValid] = useState(false);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameClick(true);
        break;
      case "email":
        setEmailClick(true);
        break;
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный электронный адрес");
    } else {
      setEmailError("");
    }
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameError("Это поле не может быть пустым");
    } else {
      setNameError("");
    }
  };

  const handleFormReset = () => {
    setName("");
    setEmail("");
    setComments("");
  };

  const handleSubmit = () => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        comments,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log({
          name: data.name,
          email: data.email,
          comments: data.comments,
        });
        handleFormReset();
      })
      .finally(() => {
        setIsLoading(false);
        setFormValid(false);
        setTimeout(
          () =>
            alert(
              "Ваши данные успешно отправились! Наши специалисты свяжутся с Вами в ближайшее время."
            ),
          1000
        );
      });
  };

  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError]);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "500px",
        pt: "100px",
        pl: "50px",
      }}
    >
      <Typography
        variant="h4"
        color="primary.main"
        p={2}
        sx={{ textAlign: "center" }}
      >
        СВЯЗАТЬСЯ С НАМИ
      </Typography>
      <TextField
        label="Ваше имя"
        value={name}
        name="name"
        type="text"
        onBlur={(e) => blurHandler(e)}
        onChange={(e) => nameHandler(e)}
        sx={{ bgcolor: "primary.light", borderRadius: "5px", m: "15px 0 0 0" }}
      />
      {nameClick && nameError && (
        <Typography sx={{ fontSize: "15px", m: 0 }} color="error">
          {nameError}
        </Typography>
      )}
      <TextField
        label="Ваш электронный адрес"
        value={email}
        name="email"
        onBlur={(e) => blurHandler(e)}
        onChange={(e) => emailHandler(e)}
        sx={{ bgcolor: "primary.light", borderRadius: "5px", m: "15px 0 0 0" }}
      />
      {emailClick && emailError && (
        <Typography sx={{ fontSize: "15px", m: 0 }} color="error">
          {emailError}
        </Typography>
      )}
      <TextField
        label="Комментарии"
        placeholder="Здесь можно оставить свои вопросы нашим специалистам"
        value={comments}
        name="comments"
        type="text"
        onChange={(e) => setComments(e.target.value)}
        sx={{ bgcolor: "primary.light", borderRadius: "5px", m: "15px 0 0 0" }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: "15px" }}>
        {isLoading ? (
          <Button
            size="medium"
            variant="contained"
            endIcon={<CircularProgress />}
          >
            Ожидайте
          </Button>
        ) : (
          <Button
            size="medium"
            type="submit"
            disabled={!formValid}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            Отправить
          </Button>
        )}
      </Box>
    </Box>
  );
}
