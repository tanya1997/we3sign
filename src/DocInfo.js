import React from 'react';
import { Grid, Card, TextField,  CardContent, Stack, Typography} from '@mui/material';

function DocInfo(props) {
    return (
        <Grid container spacing={1}>
        {props.cards.map((cards, index) => {
          const { owner, path, date_time, image } = cards;
          return (
            <Grid item>
              <Card key={index}>
                <CardContent>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Typography variant="body1">Document: </Typography>
                        <TextField id="outlined-basic" value={path}  InputProps={{readOnly: true}} variant="outlined" />
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Typography variant="body1">Wallet: </Typography>
                        <TextField id="outlined-basic" value={owner}  InputProps={{readOnly: true}} variant="outlined" />
                    </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
}

export default DocInfo;