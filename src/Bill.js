import { useEffect } from "react";

import "./Bill.css";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Table,
} from "reactstrap";

const request = async (url, params = {}, method = 'GET', headers = { 'Content-Type': 'application/json' }) => {
    let options = {
        method,
        headers
    };
    if ('GET' === method) {
        url = url + '?' + (new URLSearchParams(params)).toString();
    } else {
        options.body = JSON.stringify(params);
    }

    const response = await fetch(url, options);
    const passCode = [200, 201, 302];
    const content = await response.json();
    if (passCode.includes(response.status)) {
        const result = {
            message: content.message,
            success: true,
            data: content.data
        }
        return result;
    } else {
        const result = {
            message: content.message,
            success: false,
            data: {}
        }
        return result;
    }
};

const post = ( url, params, headers ) => request( url, params, 'POST', headers );


export default function Bill() {
    const GetURLParameter = (sParam) => {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split("&");
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    };

    useEffect(() => {
        (
            async () => {
                const id = GetURLParameter('id');
                const response = await post('http://localhost:5000/order/paymentConfirm', { id: id });
                if (response.success) {
                    console.log("success")
                }
            }
        )();
    }, [])
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <h2 className="title">Payment Success</h2>
                            </CardHeader>
                            <CardBody>
                                <h5>Now you can close this website and return to the app</h5>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}