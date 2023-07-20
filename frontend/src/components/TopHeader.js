import React from 'react';

function TopHeader() {
    return (
        <div id="top-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12"> {/* Adjust the column width for small screens */}
                        <ul className="header-links pull-left">
                            <li><a href="#"><i className="fa fa-phone"></i> +021-95-51-84</a></li>
                            <li><a href="#"><i className="fa fa-envelope-o"></i> email@email.com</a></li>
                            <li><a href="#"><i className="fa fa-map-marker"></i> 1734 Stonecoal Road</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-12"> {/* Adjust the column width for small screens */}
                        <ul className="header-links pull-right">
                            <li><a href="#"><i className="fa fa-dollar"></i> USD</a></li>
                            <li><a href="#"><i className="fa fa-user-o"></i> My Account</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopHeader;
