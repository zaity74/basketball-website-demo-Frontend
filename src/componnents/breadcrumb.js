import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './breadcrumb.scss';

const Breadcrumbs = (props) => {
    const { total } = props;
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((item) => item);

    return (
        <nav aria-label="breadcrumb" className='breadcrumb-container'>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join(' / ')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <li key={to} className="breadcrumb-item active" aria-current="page">
                            {value}
                        </li>
                    ) : (
                        <li key={to} className="breadcrumb-item">
                            <Link to={to}>{value}</Link>
                        </li>
                    );
                })}
            </ol>
            <p className='info'> {total ? `There is ${total} items ` : ''}</p>
        </nav>
    );
};

export default Breadcrumbs;
