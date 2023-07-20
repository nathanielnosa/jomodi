import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../constants';
import axios from 'axios';

function HotDeal() {
    const [banner, setBanner] = useState();
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        axios
            .get(API_URL + 'product/home_banner_image/1/')
            .then((res) => {
                setBanner(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // Set the target date and time for the countdown
        const targetDate = new Date('2023-07-21T23:59:59').getTime();

        // Update the countdown every second
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({
                days,
                hours,
                minutes,
                seconds,
            });

            // If the countdown is over, clear the interval
            if (distance < 0) {
                clearInterval(interval);
            }
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            id="hot-deal"
            className="section"
            style={{
                backgroundImage: `url(${banner?.image})`,
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="hot-deal">
                            <ul className="hot-deal-countdown">
                                <li>
                                    <div>
                                        <h3>{countdown.days}</h3>
                                        <span>Days</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <h3>{countdown.hours}</h3>
                                        <span>Hours</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <h3>{countdown.minutes}</h3>
                                        <span>Mins</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <h3>{countdown.seconds}</h3>
                                        <span>Secs</span>
                                    </div>
                                </li>
                            </ul>
                            <h2 className="text-uppercase">hot deal this week</h2>
                            <p>New Collection Up to 50% OFF</p>
                            <a className="primary-btn cta-btn" href="#">
                                Shop now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotDeal;
