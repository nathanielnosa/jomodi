import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { useParams } from 'react-router-dom';
import { Accordion } from '@mantine/core';


const ORDER_STATUS = [
    "Shipped",
    'Out for delivery',
    "Delivered",
    "Cancelled",
    'Returned'
]

const ORDER_TIME = [
    "Last 7 days",
    "Last 30 days",
    "Last 60 days",
    'Last 90 days'
]

function OrderFilter({ selectedOrderStatus, setSelectedOrderStatus, selectedOrderTime, setSelectedOrderTime }) {

    const handleStatusChange = (orderstatus) => {
        const isSelected = selectedOrderStatus.includes(orderstatus);

        if (isSelected) {
            setSelectedOrderStatus(selectedOrderStatus.filter((status) => status !== orderstatus));
        } else {
            setSelectedOrderStatus([...selectedOrderStatus, orderstatus]);
        }
    };

    const handleTimeChange = (ordertime) => {
        const isSelected = selectedOrderTime.includes(ordertime);

        if (isSelected) {
            setSelectedOrderTime(selectedOrderTime.filter((time) => time !== ordertime));
        } else {
            setSelectedOrderTime([...selectedOrderTime, ordertime]);
        }
    };


    return (
        <div id="aside" className="col-md-3">


            <div className="aside">
               
                <Accordion radius="xl" defaultValue="customization">
                    <Accordion.Item value="customization">
                        <Accordion.Control style={{
                            fontSize: "15px"
                        }}>
                            Order Status
                        </Accordion.Control>
                        <Accordion.Panel>
                            {ORDER_STATUS?.map((status, index) => (
                                <div className="input-checkbox" key={index}>
                                    <input
                                        type="checkbox"
                                        id={`brand-${index}`}
                                        checked={selectedOrderStatus?.includes(status)}
                                        onChange={() => handleStatusChange(status)}
                                    />
                                    <label htmlFor={`brand-${index}`}>
                                        <span></span>
                                        {status}
                                    </label>
                                </div>
                            )
                            )}
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <Accordion radius="xl" defaultValue="customization">
                    <Accordion.Item value="customization">
                        <Accordion.Control style={{
                            fontSize: "15px"
                        }}>
                            Order Time
                        </Accordion.Control>
                        <Accordion.Panel>
                            {
                                ORDER_TIME?.map((time, index) => (
                                    <div className="input-checkbox" key={index}>
                                        <input
                                            type="checkbox"
                                            id={`time-${index}`}   
                                            checked={selectedOrderTime?.includes(time)}
                                            onChange={() => handleTimeChange(time)}
                                        />
                                        <label htmlFor={`time-${index}`}>
                                            <span></span>
                                            {time}
                                        </label>
                                    </div>
                                )
                                )

                            }
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </div>

        </div>

    )
}

export default OrderFilter