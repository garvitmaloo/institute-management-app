import { useState, SyntheticEvent } from "react";
import { useMutation, gql } from "@apollo/client";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        message
      }
      token
    }
  }
`;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await login({ variables: { email: userEmail, password } });

    if (!loading && !error && data && !data.login.errors) {
      localStorage.setItem("token", data.login.token);
      navigate("/admin/batch");
      window.location.reload();
    }
  };

  return (
    <div className="rounded-lg shadow-md max-w-[400px] p-3 mx-auto my-20">
      <header className="py-8 mb-5 rounded-lg shadow-lg bg-slate-900 text-slate-50">
        <h1 className="text-2xl text-center font-semibold">Login</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="User Email"
          variant="outlined"
          type="email"
          autoComplete="off"
          required
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <FormControl fullWidth variant="outlined" sx={{ my: "1rem" }} required>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" fullWidth type="submit">
          Login
        </Button>
      </form>

      {data &&
        data.login.errors &&
        (data.login.errors as { message: string }[]).map(({ message }) => (
          <p
            key={message}
            className="my-5 p-3 text-center bg-red-100 ring-2 ring-red-400 text-red-500 rounded-sm"
          >
            {message}
          </p>
        ))}
    </div>
  );
}
