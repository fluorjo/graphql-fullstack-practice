import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,

} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

export const App:React.FC = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
          <Text>
            와 정말 신기해~
          </Text>
    
    </Box>
  </ChakraProvider>
)
