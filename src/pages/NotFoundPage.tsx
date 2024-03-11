import React from "react";
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-background">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div className="bg-primary px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <button>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="relative inline-block text-sm font-medium text-accent-notice group focus:outline-none focus:ring">
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-accent-notice group-hover:translate-y-0 group-hover:translate-x-0"></span>
                    <span className="relative block px-8 py-3 bg-card-dark border border-current">
                        <Link to="/">Go Home</Link>
                    </span>
                </a>
            </button>
        </main>
    );
}

export default NotFoundPage;
