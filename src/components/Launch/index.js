import { Grid, Divider, Tooltip, tooltipClasses } from "@mui/material";
import { styled } from '@mui/material/styles';
import styles from './launch.module.css'
import moment from 'moment'
import { MdFlightTakeoff, MdLocationPin } from 'react-icons/md'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { IoLogoYoutube } from 'react-icons/io'
import { BsReddit } from 'react-icons/bs'

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

const Launch = ({ props }) => {
    return (
        <Grid container className={styles.launchBox}>
            <Grid item xs={9}>
                <Grid item xs={12} className={styles.launchTitle}>
                    {props.name}
                </Grid>
                <Grid item xs={12} className={styles.launchId}>
                    {props.id}
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <div className={styles.flightNumber}>
                    <Grid container>
                        <Grid item xs={6}>
                            <MdFlightTakeoff size={20} />
                        </Grid>
                        <Grid item xs={6}>
                            <span>{props.flight_number}</span>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
            <Divider sx={{ mt: 2, mb: 1 }} style={{ width: "100%" }} />
            <Grid container spacing={1}>
                <Grid item>
                    <img src={`${props.links.patch.small}`} height={80} width={100} alt="rocket" />
                </Grid>
                <Grid item>
                    <Grid container spacing={1}>
                        <BootstrapTooltip title="Youtube" arrow>
                            <Grid item>
                                <a href={`${props.links.webcast}`} target="_blank" rel="noreferrer" style={{ color: "red" }}><IoLogoYoutube size={30} /></a>
                            </Grid>
                        </BootstrapTooltip>
                        <Grid item>
                            <BootstrapTooltip title="Reddit" arrow>
                                <a href={`${props.links.reddit.launch
                                    }`} target="_blank" rel="noreferrer" style={{ color: "#F86E32" }}><BsReddit size={30} /></a>
                            </BootstrapTooltip>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <BootstrapTooltip title={`(${props.launchpad.latitude}, ${props.launchpad.longitude})`} arrow>
                                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                    <span style={{ marginTop: "4px" }}>
                                        <MdLocationPin />
                                    </span>
                                    <span>
                                        Cape Canaveral, Florida
                                    </span>
                                </div>
                            </BootstrapTooltip>

                        </Grid>
                    </Grid>
                    <div style={{ fontSize: "small", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ marginTop: "4px" }}>
                            <AiOutlineClockCircle />
                        </span>
                        <span>
                            {moment(props.date_utc).format('Do MMM YY, h:mm:ss a')}
                        </span>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default Launch