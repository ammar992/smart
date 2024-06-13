import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"


const Auth = () => {
  return (
    <Box>
        <Outlet />
    </Box>
  )
}

export default Auth