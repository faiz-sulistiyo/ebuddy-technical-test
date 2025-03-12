"use client"
import {useLoginMutation, useRegisterMutation} from "@/store/api/auth"
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid2,
  Card,
  Stack,
} from "@mui/material"
import {useRouter} from "next/navigation"
import React, {ReactNode, SyntheticEvent, useState} from "react"

type LoginFormProps = {
  title?: string
  subtext?: ReactNode
}

const LoginForm: React.FC<LoginFormProps> = ({subtext, title}) => {
  const router = useRouter()

  const [login, {isLoading: isLoadingLogin}] = useLoginMutation()
  const [register, {isLoading: isLoadingRegister}] = useRegisterMutation()

  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(currentUser)
    router.replace("/admin/users")
  }

  const handleRegister = async () => {
    await register(currentUser)
    router.replace("/admin/users")
  }

  return (
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
      component={"form"}
      onSubmit={handleLogin}
    >
      <Grid2
        container
        spacing={0}
        justifyContent="center"
        sx={{height: "100vh"}}
      >
        <Grid2
          display="flex"
          justifyContent="center"
          alignItems="center"
          component={"div"}
        >
          <Card
            elevation={9}
            sx={{p: 4, zIndex: 1, width: "100%", maxWidth: "800px"}}
          >
            {title ? (
              <Typography fontWeight="700" align="center" variant="h4" my={2}>
                {title}
              </Typography>
            ) : null}
            <Stack>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="username"
                  mb="5px"
                >
                  Username
                </Typography>
                <TextField
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({...currentUser, email: e.target.value})
                  }
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="password"
                  mb="5px"
                >
                  Password
                </Typography>
                <TextField
                  value={currentUser.password}
                  onChange={(e) =>
                    setCurrentUser({...currentUser, password: e.target.value})
                  }
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Box>
            </Stack>
            <Box mt={2}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={isLoadingLogin}
              >
                {isLoadingLogin ? <CircularProgress size={20} /> : "Sign In"}
              </Button>
            </Box>
            <Box my={1}>
              <Typography variant="caption">{subtext}</Typography>
            </Box>
            <Box>
              <Button
                color="inherit"
                variant="contained"
                size="large"
                fullWidth
                type="button"
                onClick={handleRegister}
                disabled={isLoadingRegister}
              >
                {isLoadingRegister ? (
                  <CircularProgress size={20} />
                ) : (
                  "Sign Up With Email"
                )}
              </Button>
            </Box>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default LoginForm
