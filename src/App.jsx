import { ThemeProvider, Box } from "@mui/material";
import FormContacts from "./components/FormContacts";
import Information from "./components/Information";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
        }}
        bgcolor="secondary.main"
      >
        <FormContacts />
        <Information />
      </Box>
    </ThemeProvider>
  );
}

export default App;
