import { Grid, Paper } from "@mui/material";
import Launch from "../Launch";
import styles from './launches.module.css';

const Launches = ({ launches }) => {

    return (
        <Grid container spacing={2} alignItems="center"
            justifyContent="center">
            {launches.map((launch) => (
                <Grid key={launch.id} item columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Paper className={styles.page}>
                        <Launch props={launch} />
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}


export default Launches