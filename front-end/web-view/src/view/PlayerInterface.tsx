import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";

interface PlayerInterfaceProps {
  controls: JSX.Element;
  playlist: JSX.Element;
}

export default class PlayerInterface extends React.Component<
  PlayerInterfaceProps,
  object
> {
  render() {
    return (
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ backgroundColor: "#eeeeee" }}>
          <Typography gutterBottom variant="h5" component="div">
            Music Player
          </Typography>
          <Stack direction="column" spacing={2}>
            {this.props.controls}
            {this.props.playlist}
          </Stack>
        </CardContent>
      </Card>
    );
  }
}
