import {useEffect, useState} from "react";
import {Accordion, Button, Card, Container, Spinner} from "react-bootstrap"

export default function SearchBand({searchQuery}) {
    const [band, setBand] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [bandNotFound, setBandNotFound] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch("https://api.srgssr.ch/mx3/v2/bands?query=" + searchQuery,
            {
                "headers": {
                    "Accept": "application/json",
                    "Authorization": "Bearer LJSNZQqGxyQrgLq8n2DGDsLASqrk"
                }
            }).then(response => {
            response.json().then(json => {
                if (json.response.bands[0]) {
                    setBand(json.response.bands[0])
                    setBandNotFound(false)
                } else {
                    setBandNotFound(true)
                }
                setIsLoading(false)
            })
        })
    }, [searchQuery])

    function Performances() {
        return (
                <Container>
                    <Accordion>
                        {band.performances.map((bandPerformance) => {
                            if (bandPerformance.location) {
                                return (
                                    <Card>
                                        {}
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            {bandPerformance.location}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <table>
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">URL</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td style={{paddingRight: '100px'}}>{bandPerformance.date.substring(0, 10) || "unknown"}</td>
                                                        <td>{<a
                                                            href={bandPerformance.location_url}>{bandPerformance.location_url ? "Homepage" : "unknown"}</a> || "unknown"}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            }
                        })}
                    </Accordion>
                </Container>
        )
    }

    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>

        )
    } else if (bandNotFound) {
        return (
            <h5>This band doesn't exist</h5>
        )
    } else if (band !== undefined) {
        return (
                <Card style={{width: '100%'}}>
                    <Card.Img style={{width: '10%'}} variant="roundedCircle" src={band?.image} alt={"Band Icon"}/>
                    <Card.Body>
                        <Card.Title><h3>{band?.name}</h3></Card.Title>
                        <br/>
                        <Button href={band?.permalink}>Go To Band</Button>
                        <br/>
                        <br/>
                        <Card.Text>
                            <h5>City</h5>
                            {band?.city === null ? "unknown" : band?.city}<br/>
                        </Card.Text>
                        <Card.Text>
                            <h5>Email</h5>
                            {band?.email === null ? "unknown" : band?.email}
                        </Card.Text>
                        <Card.Text>
                            <h5>Biography</h5>
                            {band?.biographies[0]?.description || "no biography"}
                        </Card.Text>
                        <Card.Text>
                            <h5>Performances</h5>
                            <Performances/>
                        </Card.Text>
                    </Card.Body>
                </Card>
        );
    }
}
