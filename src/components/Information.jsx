import { Typography, Box, Stack } from "@mui/material";

export default function Information() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "500px",
        pt: "100px",
        pl: "50px",
      }}
    >
      <Stack p={4}>
        <Typography variant="h6" color="primary.main">
          ПОЗВОНИ НАМ
        </Typography>
        <Typography color="primary.light">
          +375297689511 <br /> +375441198050
        </Typography>

        <Typography variant="h6" color="primary.main" mt={2}>
          МЕСТО НАХОЖДЕНИЯ
        </Typography>
        <Typography color="primary.light">
          г.Минск, проспект Независимости 134
        </Typography>

        <Typography variant="h6" color="primary.main" mt={2}>
          НАШИ ЛУЧШИЕ УСЛУГИ
        </Typography>
        <Typography color="primary.light">
          Местные трансферы <br /> Трансферы из аэропорта <br /> Экскурсии и
          туры
        </Typography>
      </Stack>
    </Box>
  );
}
