import React from "react";

import games from "../data/games";
import { publishers } from "@18xx-maker/games";
import { useGame } from "../context/GameContext";

import keys from "ramda/src/keys";
import map from "ramda/src/map";

import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  DropBox: {
    borderStyle: 'dashed',
    borderWidth: theme.shape.borderRadius,
    borderColor: theme.palette.grey[500],
    backgroundColor: theme.palette.grey[300],
    height: 200,
    margin: theme.spacing(4,0),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& h4': {
      display: 'block'
    },

    '& h6': {
      display: 'block'
    }

  },
  page: {
    overflow: 'auto',
    margin: theme.spacing(4, 0),
    padding: theme.spacing(2, 2, 0, 2),

    '& p': {
      marginBottom: theme.spacing(2)
    }
  },
  games: {
    minHeight: 520,
    height: 'calc(100vh - 480px)'
  }
}))

const LoadGames = () => {
  const classes = useStyles();
  const { loadGame } = useGame();

  const gameRows = map(id => {
    const game = games[id];

    let publisherNode = null;
    if (game.publisher) {
      let publisher = publishers[game.publisher];

      if (publisher.link) {
        publisherNode = <Link rel="noreferrer"
                              target="_blank"
                              href={publishers[game.publisher].link}>
                          {publishers[game.publisher].name}
                        </Link>;
      } else {
        publisherNode = publisher.name;
      }
    }

    return (
      <TableRow key={id}>
        <TableCell>
          <Link component="button" variant="h5" onClick={() => loadGame(id)}>{game.title}</Link>
          {game.subtitle && <><br/>{game.subtitle}</>}
        </TableCell>
        <TableCell>{game.designer}</TableCell>
        <TableCell>{publisherNode}</TableCell>
        <TableCell></TableCell>
      </TableRow>
    );
  }, keys(games));

  const dragOverHandler = (event) => {
    event.preventDefault();
  };
  const dropHandler = (event) => {
    event.preventDefault();

    // We only care about the first file dragged, always
    if (event.dataTransfer.items) {
      if (event.dataTransfer.items[0].kind === 'file') {
        loadGame(event.dataTransfer.items[0].getAsFile());
      }
    } else {
      loadGame(event.dataTransfer.files[0]);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.DropBox}
             onDragOver={dragOverHandler}
             onDrop={dropHandler}
             elevation={10}>
        <Typography variant="h4" align="center" color="textSecondary">Drop any game json here to load it!</Typography>
      </Paper>
      <Paper className={classes.page} elevation={10}>
        <Typography variant="h3">Bundled Games</Typography>
        <Typography variant="body1">
          These games come bundled with 18xx Maker. Please make sure to show your support to the designers and publishers!
        </Typography>
        <TableContainer className={classes.games}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Designer</TableCell>
                <TableCell>Publisher</TableCell>
                <TableCell>Players</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameRows}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default LoadGames;