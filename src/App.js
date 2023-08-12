import './App.css';
import { useState, useEffect } from "react";
import Launches from "./components/Launches";
import { Button, Container } from "@mui/material";
import TextField from '@mui/material/TextField';
import Loader from './components/Loader';

function App() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const apiUrl = 'https://api.spacexdata.com/v4/launches/query';

    function getQueryBody(pageNumber) {
        return {
            query: {
                upcoming: false,
                success: true
            },
            options: {
                page: pageNumber,
                select: {
                    id: 1,
                    name: 2,
                    links: 3,
                    date_utc: 4,
                    flight_number: 5,
                },
                populate: [
                    {
                        path: 'rocket',
                        select: {
                            id: 1,
                            name: 2,
                            type: 3,
                            description: 4,
                            height: 5,
                            diameter: 6,
                            mass: 7,
                            flickr_images: 8,
                        },
                    },
                    {
                        path: 'crew',
                        select: {
                            id: 1,
                            name: 2,
                            agency: 3,
                            image: 4,
                        },
                    },
                    {
                        path: 'payloads',
                        select: {
                            id: 1,
                            name: 2,
                            type: 3,
                            orbit: 4,
                            reference_system: 5,
                            regime: 6
                        }
                    },
                    {
                        path: 'capsules',
                        select: {
                            id: 1,
                            type: 2,
                            status: 3,
                            serial: 4
                        }
                    },
                    {
                        path: 'launchpad',
                        select: {
                            id: 1,
                            name: 2,
                            full_name: 3,
                            locality: 4,
                            region: 5,
                            latitude: 6,
                            longitude: 7,
                            details: 8
                        }
                    }
                ],
                sort: {
                    flight_number: 'desc',
                },
            },
        };

    }

    const fetchData = async (pageNumber) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getQueryBody(pageNumber)),
            });

            if (!response.ok) {
                console.log('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData)
            setData(responseData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, []);

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        fetchData(currentPage + 1)
    }
    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        fetchData(currentPage - 1)
    }

    const onChangePageNumber = (pageNumber) => {
        if (!isNaN(Number(pageNumber)) && pageNumber > 0 && pageNumber <= data["totalPages"]) {
            setCurrentPage(pageNumber)
            fetchData(pageNumber)
        } else if (pageNumber <= 0) {
            setCurrentPage(1)
        } else if (pageNumber >= data["totalPages"]) {
            setCurrentPage(data["totalPages"])
        }
    }

    return (
        <>
            {
                !loading ? (
                    <div className='mainApp'>
                        <Container>
                            <div className='totalLaunchOuterBox'>
                                <p className='totalLaunchBox'>Total <img className='launchIcon' src='/launch-icon.png' alt='launch icon' />
                                    <span className='totalLaunchNumberBox'>
                                        {data["totalDocs"]}
                                    </span>
                                </p>
                            </div>
                            <div className='mainLaunchBox'>
                                <Launches launches={data["docs"]} />
                                <div className='footer'>
                                    <div className='mt-20 mb-20'>
                                        <TextField
                                            id="standard-number"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            className="pageNumberInput"
                                            InputProps={{
                                                disableUnderline: true, inputProps: {
                                                    style: { textAlign: "center" },
                                                }
                                            }}
                                            value={currentPage}
                                            onChange={(e) => onChangePageNumber(e.target.value)}
                                        />
                                        <span style={{ fontSize: '17pt' }}>
                                            / {data["totalPages"]}
                                        </span>
                                    </div>
                                    <div>
                                        <Button variant="contained" onClick={prevPage} disabled={currentPage <= 1} style={{ marginRight: '10px' }}>Prev Page</Button>
                                        <Button variant="contained" onClick={nextPage} disabled={currentPage >= data["totalPages"]}>Next
                                            Page</Button>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                ) : (
                    <Loader isShow={loading} />
                )
            }
        </>
    );
}
export default App;
