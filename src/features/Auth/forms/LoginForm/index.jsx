import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, TextField, Typography, createTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import * as Yup from "yup";

LoginForm.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

const theme = createTheme();

function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { closeDialog, onSignIn } = props;

  const Account = {
    email: "",
    password: "",
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: Account.email,
      password: Account.password,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please enter your username")
        .email("Invalid email (ABC@gmail.com)"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values) => {
      try {
        const LoggedAccount = {
          email: values.email,
          password: values.password,
        };
        const response = await fetch(
          "https://animall-400708.et.r.appspot.com/api/v1/accounts/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(LoggedAccount),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (closeDialog) {
            closeDialog();
          }
          localStorage.setItem("ACCOUNT__LOGGED", JSON.stringify(data.data));
          if (onSignIn) {
            onSignIn();
          }
          enqueueSnackbar("Login successful", {
            variant: "success",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
          // Handle successful login, such as setting authentication state
        } else {
          enqueueSnackbar("Login failed, Check your username or password", {
            variant: "error",
          });
          // Handle failed login, show error message, etc.
        }
      } catch (error) {
        // console.error("Error during login:", error);
        enqueueSnackbar("Login failed, Check your username or password", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        // Handle error, show error message, etc.
      }
    },
  });

  return (
    <Box>
      {/* Title form */}
      <Typography
        style={{ margin: theme.spacing(2, 0, 3, 0), textAlign: "center" }}
        component="h3"
        variant="h5"
      >
        SIGN IN
      </Typography>

      {/* Login Form */}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          //helperText="Please enter your email"
          id="email"
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <Typography variant="caption" color="red">
            {formik.errors.email}
          </Typography>
        ) : null}

        <TextField
          fullWidth
          margin="normal"
          //helperText="Please enter your email"
          id="password"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {formik.touched.password && formik.errors.password ? (
          <Typography variant="caption" color="red">
            {formik.errors.password}
          </Typography>
        ) : null}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Sign in
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
